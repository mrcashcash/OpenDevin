import tiktoken

def count_file_tokens(file_path):
    """
    Counts the number of tokens in a file using the tiktoken library.

    Args:
        file_path (str): The path to the file.

    Returns:
        int: The number of tokens in the file.
    """
    # Load the cl100k_base encoding from tiktoken
    encoding = tiktoken.get_encoding("cl100k_base")

    with open(file_path, "r", encoding="utf-8") as file:
        text = file.read()

    # Encode the text and count the number of tokens
    tokens = encoding.encode(text)
    num_tokens = len(tokens)
    print(f"Number of tokens: {num_tokens} for file: {file}")

    return num_tokens