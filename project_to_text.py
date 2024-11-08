import os
import argparse
import re

def remove_all_comments(code, file_extension):
    if file_extension in ['.py']:
        # Remove all comments for Python
        code = re.sub(r'"""[\s\S]*?"""', '', code)
        code = re.sub(r"'''[\s\S]*?'''", '', code)
        code = re.sub(r'#.*', '', code)
    elif file_extension in ['.js', '.java', '.c', '.cpp', '.ts', '.cs']:
        # Remove all comments for C-style languages
        code = re.sub(r'/\*[\s\S]*?\*/', '', code)
        code = re.sub(r'//.*', '', code)
    elif file_extension in ['.html', '.xml']:
        # Remove HTML/XML comments
        code = re.sub(r'<!--[\s\S]*?-->', '', code)
    elif file_extension in ['.css', '.scss', '.less']:
        # Remove CSS-style comments
        code = re.sub(r'/\*[\s\S]*?\*/', '', code)
    
    # Remove any remaining single-line comments that might be language-specific
    code = re.sub(r'^\s*#.*$', '', code, flags=re.MULTILINE)
    code = re.sub(r'^\s*//.*$', '', code, flags=re.MULTILINE)
    
    # Remove shebang lines
    code = re.sub(r'^#!.*$', '', code, flags=re.MULTILINE)
    
    # Remove common license/copyright patterns
    code = re.sub(r'^\s*\* .*$', '', code, flags=re.MULTILINE)
    code = re.sub(r'^\s*\*.*$', '', code, flags=re.MULTILINE)
    code = re.sub(r'^\s*@license.*$', '', code, flags=re.MULTILINE)
    code = re.sub(r'^\s*@copyright.*$', '', code, flags=re.MULTILINE)
    
    # Remove empty lines and leading/trailing whitespace
    code = '\n'.join(line for line in code.splitlines() if line.strip())
    return code.strip()

def project_to_text(project_path, output_file):
    with open(output_file, 'w', encoding='utf-8') as f:
        for root, dirs, files in os.walk(project_path):
            level = root.replace(project_path, '').count(os.sep)
            indent = ' ' * 4 * level
            f.write(f'{indent}{os.path.basename(root)}/\n')
            subindent = ' ' * 4 * (level + 1)
            for file in files:
                relative_path = os.path.relpath(os.path.join(root, file), project_path)
                f.write(f'{subindent}{file}\n')
                file_path = os.path.join(root, file)
                try:
                    with open(file_path, 'r', encoding='utf-8') as content_file:
                        content = content_file.read()
                        file_extension = os.path.splitext(file)[1].lower()
                        content_without_comments = remove_all_comments(content, file_extension)
                        if content_without_comments.strip():  # Only write non-empty content
                            f.write(f'{subindent}Content:\n')
                            f.write(f'{subindent}```\n')
                            f.write(f'File: {relative_path}\n\n')
                            f.write(f'{content_without_comments}\n')
                            f.write(f'{subindent}```\n\n')
                except Exception as e:
                    f.write(f'{subindent}Error reading file: {str(e)}\n\n')

def main():
    parser = argparse.ArgumentParser(description='Convert a project folder to a single text file, excluding all comments.')
    parser.add_argument('project_path', help='Path to the project folder')
    parser.add_argument('output_file', help='Path to the output text file')
    args = parser.parse_args()

    project_to_text(args.project_path, args.output_file)
    print(f"Project converted successfully. Output saved to {args.output_file}")

if __name__ == '__main__':
    main()