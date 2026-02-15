import os
from PIL import Image

def optimize_images(directory, max_width=1200, quality=85):
    print(f"Optimizing images in {directory}...")
    
    # Get all files in directory
    files = [f for f in os.listdir(directory) if os.path.isfile(os.path.join(directory, f))]
    
    count = 0
    saved_space = 0
    
    for filename in files:
        if filename.lower().endswith(('.jpg', '.jpeg', '.png')):
            filepath = os.path.join(directory, filename)
            
            try:
                original_size = os.path.getsize(filepath)
                
                with Image.open(filepath) as img:
                    # Check if resize needed
                    width, height = img.size
                    if width > max_width:
                        ratio = max_width / width
                        new_height = int(height * ratio)
                        img = img.resize((max_width, new_height), Image.Resampling.LANCZOS)
                        print(f"Resized {filename}: {width}x{height} -> {max_width}x{new_height}")
                    
                    # Save with optimization
                    # Preserve original format
                    if filename.lower().endswith('.png'):
                        # For PNG, we can't use 'quality' the same way, but optimize=True helps
                        img.save(filepath, optimize=True)
                    else:
                        # JPEG
                        # Using 'quality' and 'optimize'
                        img.save(filepath, quality=quality, optimize=True)
                
                new_size = os.path.getsize(filepath)
                saved = original_size - new_size
                if saved > 0:
                    saved_space += saved
                    print(f"Optimized {filename}: {original_size/1024:.1f}KB -> {new_size/1024:.1f}KB (Saved {saved/1024:.1f}KB)")
                    count += 1
                else:
                    print(f"Skipped {filename} (no savings)")
                    
            except Exception as e:
                print(f"Error processing {filename}: {e}")

    print(f"\nTotal images optimized: {count}")
    print(f"Total space saved: {saved_space / (1024*1024):.2f} MB")

if __name__ == "__main__":
    # Optimize 'Galerija' folder
    gallery_path = os.path.join(os.getcwd(), 'Galerija')
    if os.path.exists(gallery_path):
        optimize_images(gallery_path, max_width=1200, quality=80)
    else:
        print(f"Directory not found: {gallery_path}")

    # Optimize root folder images (logo maybe?)
    # Be careful with logo quality, but usually safe.
    optimize_images(os.getcwd(), max_width=1200, quality=90)
