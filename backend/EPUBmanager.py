import zipfile
import xml.etree.ElementTree as xml

class EPUBManager:
    
    def __init__(self) -> None:
        pass

    def read_epub(self,file_path):
        with zipfile.ZipFile(file_path, 'r') as z:
            file_list = z.namelist()
            metadata_file = z.read('META-INF/container.xml')
            opf_root = xml.fromstring(metadata_file)
            print(opf_root)
        


if __name__ == "__main__":
    epub = EPUBManager()
    print(epub.read_epub('/Users/akhilesh/Documents/Repos/HomeAutomationRemote/HomeAutomationRemote/backend/epub/Middlemarch.epub'))

