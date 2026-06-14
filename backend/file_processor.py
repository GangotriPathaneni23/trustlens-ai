import fitz

from docx import Document


class FileProcessor:

    def extract_text(
        self,
        filepath
    ):

        if filepath.endswith(".pdf"):

            return self.extract_pdf(
                filepath
            )

        elif filepath.endswith(".docx"):

            return self.extract_docx(
                filepath
            )

        elif filepath.endswith(".txt"):

            return self.extract_txt(
                filepath
            )

        return ""

    def extract_pdf(
        self,
        filepath
    ):

        text = ""

        doc = fitz.open(
            filepath
        )

        for page in doc:

            text += (
                page.get_text()
                + "\n"
            )

        return text

    def extract_docx(
        self,
        filepath
    ):

        doc = Document(
            filepath
        )

        return "\n".join(

            para.text

            for para in doc.paragraphs

        )

    def extract_txt(
        self,
        filepath
    ):

        with open(
            filepath,
            "r",
            encoding="utf-8"
        ) as file:

            return file.read()