import os
from PIL import Image

def rotate_images(directory):
    # Target images 8-16
    # Note: 8,9 are .jpg ; 10-16 are .jpeg
    target_files = [
        'slika8.jpg', 'slika9.jpg',
        'slika10.jpeg', 'slika11.jpeg', 'slika12.jpeg', 'slika13.jpeg', 
        'slika14.jpeg', 'slika15.jpeg', 'slika16.jpeg'
    ]
    
    print("Rotiram slike 8-16 za 90 stupnjeva u lijevo (CCW) da ih vratim na 0...")
    # Korisnik kaže "u -90 da se vrati na 0". 
    # Ako su sada na -90 (jer sam ih prošli put rotirao CW), onda ih treba rotirati +90 (CCW) da se vrate na 0.
    # PIL rotate(90) je CCW.
    
    count = 0 
    for filename in target_files:
        filepath = os.path.join(directory, filename)
        if os.path.exists(filepath):
            try:
                with Image.open(filepath) as img:
                    # rotate(90) rotates CCW (Counter Clockwise).
                    rotated = img.rotate(90, expand=True) 
                    rotated.save(filepath, quality=85, optimize=True)
                    print(f"Rotated {filename} 90 degrees (CCW). New size: {rotated.size}")
                    count += 1
            except Exception as e:
                print(f"Error {filename}: {e}")
        else:
             print(f"File not found: {filename}")

    print(f"Rotirano {count} slika.")

if __name__ == "__main__":
    gallery_path = os.path.join(os.getcwd(), 'Galerija')
    if os.path.exists(gallery_path):
        rotate_images(gallery_path)
    else:
        print("Galerija folder not found.")
