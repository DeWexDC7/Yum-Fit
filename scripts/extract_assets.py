import os
import cv2

def extract_assets():
    video_path = os.path.join("Assets", "gemini_generated_video_27d573df.mp4")
    out_dir = os.path.join("Assets", "images")
    os.makedirs(out_dir, exist_ok=True)

    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        raise RuntimeError(f"Could not open video file: {video_path}")

    frames_to_extract = {
        10: "fresh-salad.jpg",
        60: "avocado-prep.jpg",
        120: "power-steak-bowl.jpg",
        130: "video-poster.jpg"
    }

    extracted_count = 0
    for frame_idx, filename in frames_to_extract.items():
        cap.set(cv2.CAP_PROP_POS_FRAMES, frame_idx)
        success, frame = cap.read()
        if success:
            target_path = os.path.join(out_dir, filename)
            cv2.imwrite(target_path, frame, [cv2.IMWRITE_JPEG_QUALITY, 92])
            print(f"Extracted frame {frame_idx} -> {target_path}")
            extracted_count += 1
        else:
            print(f"Failed to read frame {frame_idx}")

    cap.release()
    print(f"Extraction complete: {extracted_count}/{len(frames_to_extract)} assets saved.")

if __name__ == "__main__":
    extract_assets()
