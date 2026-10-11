import os
import re
import sys
import time
import socket
import threading
import urllib.request
from http.server import SimpleHTTPRequestHandler, HTTPServer

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self, format, *args):
        pass  # Silenciar logs estándar en consola

def get_free_port():

    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.bind(('', 0))
    port = s.getsockname()[1]
    s.close()
    return port


def run_tests():
    print("==================================================")
    print("   YUM & FIT - END-TO-END VERIFICATION SUITE      ")
    print("==================================================")

    # 1. Verification of critical files on disk
    required_files = [
        "index.html",
        "css/styles.css",
        "js/menu-data.js",
        "js/main.js",
        "Assets/logo.jpg",
        "Assets/gemini_generated_video_27d573df.mp4",
        "Assets/images/power-steak-bowl.jpg",
        "Assets/images/fresh-salad.jpg",
        "Assets/images/avocado-prep.jpg",
        "Assets/images/video-poster.jpg"
    ]

    print("\n[1/4] Verificando presencia de archivos críticos...")
    for f in required_files:
        if not os.path.exists(f):
            print(f"❌ Archivo faltante: {f}")
            sys.exit(1)
        size_kb = os.path.getsize(f) / 1024
        print(f"  ✓ {f} ({size_kb:.1f} KB)")

    # 2. HTML Semantics and Brand Compliance
    print("\n[2/4] Verificando estructura HTML y requerimientos de marca...")
    html_content = open("index.html", encoding="utf-8").read()

    required_snippets = [
        ('id="hero"', "Sección Hero principal"),
        ('id="menu"', "Sección de Menú interactivo"),
        ('id="cocina"', "Sección de Cocina / Video"),
        ('id="valores"', "Sección Bento Grid de Valores"),
        ('id="contacto"', "Sección de Contacto y Horarios"),
        ('<footer', "Footer de página"),
        ("098 184 0168", "Teléfono oficial en vista"),
        ("593981840168", "Enlace API de WhatsApp"),
        ("gemini_generated_video_27d573df.mp4", "Video promocional enlazado"),
        ("Assets/logo.jpg", "Logo de la marca enlazado"),
        ("whatsapp-floating", "Widget flotante de WhatsApp")
    ]

    for snippet, desc in required_snippets:
        if snippet not in html_content:
            print(f"❌ Falló validación: {desc} ('{snippet}') no encontrado en index.html")
            sys.exit(1)
        print(f"  ✓ {desc} verificado.")

    # 3. Validar consistencia de enlaces locales en HTML
    print("\n[3/4] Comprobando que todas las rutas locales enlazadas existen...")
    local_links = re.findall(r'(?:src|href)=[\'"]([^\'"]+)[\'"]', html_content)
    missing = []
    for link in local_links:
        if link.startswith(('http://', 'https://', '#', 'tel:', 'mailto:')):
            continue
        # Limpiar hash o query si existiera
        clean_path = link.split('?')[0].split('#')[0]
        if not os.path.exists(clean_path):
            missing.append(clean_path)

    if missing:
        print(f"❌ Enlaces rotos encontrados: {missing}")
        sys.exit(1)
    print(f"  ✓ {len(local_links)} enlaces inspeccionados. 0 enlaces rotos.")

    # 4. Prueba con servidor HTTP local
    print("\n[4/4] Levantando servidor web local y testeando respuestas HTTP...")
    port = get_free_port()
    
    server = HTTPServer(('127.0.0.1', port), QuietHandler)

    server_thread = threading.Thread(target=server.serve_forever)
    server_thread.daemon = True
    server_thread.start()
    time.sleep(0.5)

    base_url = f"http://127.0.0.1:{port}"
    endpoints_to_test = [
        "/index.html",
        "/css/styles.css",
        "/js/menu-data.js",
        "/js/main.js",
        "/Assets/logo.jpg",
        "/Assets/images/power-steak-bowl.jpg",
        "/Assets/gemini_generated_video_27d573df.mp4"
    ]

    for endpoint in endpoints_to_test:
        req = urllib.request.Request(f"{base_url}{endpoint}")
        if endpoint.endswith(".mp4"):
            req.add_header("Range", "bytes=0-1024")
        
        try:
            with urllib.request.urlopen(req, timeout=5) as response:
                status = response.getcode()
                _ = response.read()
                if status in [200, 206]:
                    print(f"  ✓ HTTP {status} OK -> {endpoint}")
                else:
                    print(f"❌ HTTP {status} inesperado en {endpoint}")
                    server.shutdown()
                    sys.exit(1)


        except Exception as e:
            print(f"❌ Error al consultar {endpoint}: {e}")
            server.shutdown()
            sys.exit(1)

    server.shutdown()
    print("\n==================================================")
    print(" 🎉 TODAS LAS PRUEBAS E2E PASARON CON ÉXITO (100%)")
    print("==================================================")

if __name__ == "__main__":
    run_tests()
