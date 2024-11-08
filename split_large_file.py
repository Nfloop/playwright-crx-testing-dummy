import os
import argparse

def split_file(input_file, output_dir, max_size_mb=9):
    max_size_bytes = max_size_mb * 1024 * 1024  # Convert MB to bytes
    
    # Create output directory if it doesn't exist
    os.makedirs(output_dir, exist_ok=True)
    
    file_number = 1
    current_size = 0
    current_content = []
    
    with open(input_file, 'r', encoding='utf-8') as f:
        for line in f:
            line_size = len(line.encode('utf-8'))
            
            if current_size + line_size > max_size_bytes:
                # Write current content to file
                output_file = os.path.join(output_dir, f'split_{file_number}.txt')
                with open(output_file, 'w', encoding='utf-8') as out_f:
                    out_f.writelines(current_content)
                print(f"Created {output_file}")
                
                # Reset for next file
                file_number += 1
                current_size = 0
                current_content = []
            
            current_size += line_size
            current_content.append(line)
    
    # Write any remaining content
    if current_content:
        output_file = os.path.join(output_dir, f'split_{file_number}.txt')
        with open(output_file, 'w', encoding='utf-8') as out_f:
            out_f.writelines(current_content)
        print(f"Created {output_file}")

def main():
    parser = argparse.ArgumentParser(description='Split a large text file into smaller files, each not exceeding a specified size.')
    parser.add_argument('input_file', help='Path to the input text file')
    parser.add_argument('output_dir', help='Directory to store the split files')
    parser.add_argument('--max_size', type=int, default=9, help='Maximum size of each split file in MB (default: 9)')
    args = parser.parse_args()

    split_file(args.input_file, args.output_dir, args.max_size)
    print("File splitting completed successfully.")

if __name__ == '__main__':
    main()
