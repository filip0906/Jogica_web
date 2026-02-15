import re
import os

def minify_css(content):
    # Remove comments
    content = re.sub(r'/\*[\s\S]*?\*/', '', content)
    # Remove whitespace
    content = re.sub(r'\s+', ' ', content)
    content = re.sub(r'\s*([{:;,])\s*', r'\1', content)
    content = re.sub(r';}', '}', content)
    return content.strip()

def minify_js(content):
    # Very basic JS minification
    # Remove single line comments
    content = re.sub(r'//.*', '', content)
    # Remove multi-line comments
    content = re.sub(r'/\*[\s\S]*?\*/', '', content)
    # Remove extra spaces/newlines
    content = re.sub(r'\s+', ' ', content)
    return content.strip()

def process_file(filename, type):
    if not os.path.exists(filename):
        print(f"File not found: {filename}")
        return

    print(f"Minifying {filename}...")
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    if type == 'css':
        minified = minify_css(content)
        new_name = filename.replace('.css', '.min.css')
    elif type == 'js':
        minified = minify_js(content)
        new_name = filename.replace('.js', '.min.js')
    
    with open(new_name, 'w', encoding='utf-8') as f:
        f.write(minified)
    
    print(f"Created {new_name}")

if __name__ == "__main__":
    process_file('style.css', 'css')
    process_file('script.js', 'js')
