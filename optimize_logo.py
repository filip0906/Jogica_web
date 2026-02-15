import os
from PIL import Image

def optimize_logo():
    filename = "Jogica2png-removebg-preview.png"
    if not os.path.exists(filename):
        print(f"File not found: {filename}")
        return

    try:
        with Image.open(filename) as img:
            print(f"Original size: {img.size}")
            # Resize to 250px width (plenty for 110px display width even on retina)
            width, height = img.size
            if width > 250:
                ratio = 250 / width
                new_height = int(height * ratio)
                img = img.resize((250, new_height), Image.Resampling.LANCZOS)
                print(f"Resized to: {250}x{new_height}")
            
            # Save optimization
            img.save(filename, optimize=True)
            print(f"Optimized {filename}")
            
            # Additional check: Create a WebP version
            webp_name = filename.replace('.png', '.webp')
            img.save(webp_name, 'WEBP', quality=85)
            print(f"Created {webp_name}")

    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    optimize_logo()
