import sys
from typing import Optional
from PySide6.QtWidgets import (
    QApplication,
    QCheckBox,
    QComboBox,
    QDateEdit,
    QDateTimeEdit,
    QDial,
    QDoubleSpinBox,
    QFontComboBox,
    QLabel,
    QLCDNumber,
    QLineEdit,
    QMainWindow,
    QProgressBar,
    QPushButton,
    QRadioButton,
    QSlider,
    QSpinBox,
    QTimeEdit,
    QVBoxLayout,
    QHBoxLayout,
    QStackedWidget,
    QScrollArea,
    QStyle,
    QWidget,
)
from PySide6.QtCore import QSize,Qt
from PySide6.QtGui import QPixmap,QIcon

class MenuImageCarousel(QWidget):
    image_carousel = None
    currentImageSelection = None

    def __init__(self, images, *args, **kwargs):
        super(MenuImageCarousel, self).__init__(*args, **kwargs)
        self.image_carousel = images
        self.currentImageSelection = 0

    def create_carousel(self):
        layout = QVBoxLayout()
        self.image_label = QLabel()
        self.image_label.setAlignment(Qt.AlignmentFlag.AlignCenter)

        self.stacked_view = QStackedWidget()

        for path in self.image_carousel:
            image = QPixmap(path)
            label = QLabel()
            label.setPixmap(image)
            label.setAlignment(Qt.AlignmentFlag.AlignCenter)
            self.stacked_view.addWidget(label)

        self.prev_button = QPushButton("<")
        self.next_button = QPushButton(">")

        self.prev_button.clicked.connect(self.previous_image_view)
        self.next_button.clicked.connect(self.next_image_view)

        layout.addWidget(self.image_label)
        layout.addWidget(self.prev_button)
        layout.addWidget(self.next_button)

        self.setLayout(layout)

        self.update()

    def previous_image_view(self):
        if self.currentImageSelection > 0:
            self.currentImageSelection -= 1
            self.update()

    def next_image_view(self):
        if self.currentImageSelection < len(self.image_carousel) - 1:
            self.currentImageSelection += 1
            self.update()

    def update(self):
        self.stacked_view.setCurrentIndex(self.currentImageSelection)

        


class MenuCardTitle(QLabel):
    def __init__(self, title,subtitle, *args, **kwargs):
        super(MenuCardTitle, self).__init__(*args, **kwargs)
        layout = QVBoxLayout()
        title_label = QLabel(title)
        title_label.setStyleSheet("font-size: 44px; font-weight: bold;color:white;")

        # Create a small subtitle label
        subtitle_label = QLabel(subtitle)
        subtitle_label.setStyleSheet("font-size: 14px; color: gray;")

        layout.addWidget(title_label)
        layout.addSpacing(5)
        layout.addWidget(subtitle_label)

        self.setLayout(layout)
        self.setFixedSize(QSize(200,100))
        # self.setStyleSheet("background-color: #f5f5f5; border-radius: 10px;")

class MusicCardTitle(QLabel):
     def __init__(self, title,subtitle, *args, **kwargs):
        super(MusicCardTitle, self).__init__(*args, **kwargs)
        layout = QVBoxLayout()
        title_label = QLabel(title)
        title_label.setStyleSheet("font-size: 20px; font-weight: bold;color:white;")

        # Create a small subtitle label
        subtitle_label = QLabel(subtitle)
        subtitle_label.setStyleSheet("font-size: 14px; color: white;")

        layout.addWidget(title_label)
        layout.addSpacing(0)
        layout.addWidget(subtitle_label)

        self.setLayout(layout)
        self.setFixedSize(QSize(200,100))
        # self.setStyleSheet("background-color: #f5f5f5; border-radius: 10px;")

class MusicMetadata(QLabel):
    def __init__(self,*args,**kwargs):
        super(MusicMetadata, self).__init__(*args, **kwargs)
        layout = QHBoxLayout()
        sublayout = QVBoxLayout()
        layout.setSpacing(5)

        musicArtwork = QLabel()
        musicArtwork.setStyleSheet("background-color: rgba(128, 0, 0, 128);")
        musicArtwork.setFixedSize(QSize(60,60))
        layout.addWidget(musicArtwork)

        title_label = QLabel("Title")
        artist_label = QLabel("Artist")
        sublayout.addWidget(title_label)
        sublayout.addWidget(artist_label)
        layout.addLayout(sublayout)

        self.setLayout(layout)
        self.setFixedSize(QSize(100,100))

class PlaybackModule(QWidget):
    is_playing = False

    def __init__(self, *args,**kwargs):
        super(PlaybackModule, self).__init__(*args, **kwargs)
        layout = QHBoxLayout()
        layout.setSpacing(0)

        musicMetadata = MusicMetadata()
        layout.addWidget(musicMetadata)

        musicMetadata.setFixedSize(QSize(150,50))
        

        rewind_button = QPushButton()
        pixmapapi = getattr(QStyle,"SP_MediaSkipBackward")
        icon = self.style().standardIcon(pixmapapi)
        rewind_button.setIcon(icon)
        rewind_button.clicked.connect(self.on_rewind_clicked)

        play_button = QPushButton()
        pixmapapi = getattr(QStyle,"SP_MediaPlay")
        icon = self.style().standardIcon(pixmapapi)
        play_button.setIcon(icon)
        play_button.clicked.connect(self.on_play_clicked)

        forward_button = QPushButton()
        pixmapapi = getattr(QStyle,"SP_MediaSkipForward")
        icon = self.style().standardIcon(pixmapapi)
        forward_button.setIcon(icon)
        forward_button.clicked.connect(self.on_forward_clicked)

        
        layout.addWidget(rewind_button)
        layout.addWidget(play_button)
        layout.addWidget(forward_button)

        self.setLayout(layout)

    def on_play_clicked(self):
        if self.is_playing:
            self.is_playing = False
            pixmapapi = getattr(QStyle,"SP_MediaPlay")
            icon = self.style().standardIcon(pixmapapi)
            self.sender().setIcon(icon)
        else:
            self.is_playing = True
            pixmapapi = getattr(QStyle,"SP_MediaPause")
            icon = self.style().standardIcon(pixmapapi)
            self.sender().setIcon(icon)

    def on_pause_clicked(self):
        pass

    def on_rewind_clicked(self):
        pass

    def on_forward_clicked(self):
        pass

class MusicPlayback(QLabel):
     def __init__(self, title,subtitle, *args, **kwargs):
        super(MusicPlayback, self).__init__(*args, **kwargs)
        layout = QVBoxLayout()
        title_label = PlaybackModule()

        # Create a small subtitle label
        subtitle_label = QSlider(Qt.Orientation.Horizontal)

        layout.addWidget(title_label)
        layout.addSpacing(0)
        layout.addWidget(subtitle_label)

        self.setLayout(layout)
        self.setFixedSize(QSize(200,100))

class MusicMenuCard(QWidget):

    def __init__(self, widgets, *args, **kwargs):
        super(MusicMenuCard, self).__init__(*args, **kwargs)

        layout = QVBoxLayout()
        titleLayout = QHBoxLayout()
        label1 = MusicCardTitle(title="Apple Homepod",subtitle="Smart Audio Line-Up")
        label2 = MusicPlayback(title="Apple Homepod",subtitle="Smart Audio Line-Up")
        backgroundLabel = QLabel()

        overlay_label = QLabel(parent=backgroundLabel)  # Overlay label
        overlay_label.setStyleSheet("background-color: rgba(128, 128, 128, 128);")
        overlay_label.setGeometry(20,0,85,85)  # Semi-transparent black

        titleLayout.addWidget(backgroundLabel)
        titleLayout.addWidget(label1)
        layout.addLayout(titleLayout)
        layout.addWidget(label2)

        layout.setSpacing(0)

        backgroundLabel.setFixedSize(QSize(110,100))
        label1.setFixedSize(QSize(190,100))
        label2.setStyleSheet("background-color: #000000; border-radius: 0px;")
        label2.setFixedSize(QSize(300,100))

        # self._dial = QDial()
        # layout.addWidget(self._dial)

        self.setLayout(layout)
        self.setStyleSheet("background-color: #000000; border-radius: 0px;")
        self.setFixedSize(QSize(300,200))
        overlay_label.raise_()

class MenuCard(QWidget):

    def __init__(self, widgets, *args, **kwargs):
        super(MenuCard, self).__init__(*args, **kwargs)

        layout = QHBoxLayout()
        leftSubLayout = QVBoxLayout()
        leftSubLayout.addWidget(widgets[0])
        layout.addLayout(leftSubLayout)
        layout.addWidget(widgets[1])
        layout.addWidget(widgets[2])

        layout.setSpacing(0)

        widgets[0].setStyleSheet("background-color: #000000;border-right: 0.5px solid gray;color:white;")
        widgets[0].setFixedSize(QSize(50,100))
        widgets[2].setStyleSheet("background-color: #D93A5E;")
        widgets[2].setFixedSize(QSize(50,100))

        # self._dial = QDial()
        # layout.addWidget(self._dial)

        self.setLayout(layout)
        self.setStyleSheet("background-color: #000000; border-radius: 0px;")
        self.setFixedSize(QSize(300,200))
        

class LightScreen(QMainWindow):
    pass

class MainApp(QMainWindow):
    widgets = None

    def __init__(self):
        super().__init__()
        self.setFixedSize(QSize(720,720))
        scroll = QScrollArea()
        scroll_widget = QWidget()
        layout = QVBoxLayout()
        layout.setAlignment(Qt.AlignmentFlag.AlignCenter)

        image_label = QLabel()
        image = QPixmap('./widget_research/360_F_535677467_iDO9waFgRKX5IKvOjfhxBCQjFdHyJegi.jpg')
        image_label.setPixmap(image)

        layout.addWidget(image_label)

        layout.setSpacing(0)
        scroll.setAlignment(Qt.AlignmentFlag.AlignCenter)
        self.init_menu_cards()

        for widgets in self.widgets:
            layout.addWidget(widgets)

        scroll_widget.setLayout(layout)
        scroll.setWidget(scroll_widget)

        centralWidget = QWidget()
        # centralWidget.setLayout(layout)
        self.setCentralWidget(scroll)
        self.setStyleSheet("background-color: #171718;")
        with open("./stylesheets/homeScreenStyle.qss") as file:
            style = file.read()
            print(style)
            scroll.setStyleSheet(style)

    def init_menu_cards(self):
        self.widgets = [
            MenuCard([QLabel("Hello"),MenuCardTitle(title="Title",subtitle="Subtitle"),QPushButton(">")]),
            MenuCard([QLabel("Hello"),MenuCardTitle(title="Title",subtitle="Subtitle"),QPushButton(">")]),
            MenuCard([QLabel("Hello"),MenuCardTitle(title="Title",subtitle="Subtitle"),QPushButton(">")]),
            MenuCard([QLabel("Hello"),MenuCardTitle(title="Title",subtitle="Subtitle"),QPushButton(">")]),
            MenuCard([QLabel("Hello"),MenuCardTitle(title="Title",subtitle="Subtitle"),QPushButton(">")]),
            MenuCard([QLabel("Hello"),MenuCardTitle(title="Title",subtitle="Subtitle"),QPushButton(">")]),
            MusicMenuCard([QLabel("Hello"),MenuCardTitle(title="Title",subtitle="Subtitle"),QPushButton(">")]),
            
        ]
        
    def showMessage(self):
        self.label.setText("Button Clicked!")

def main():
    app = QApplication(sys.argv)
    window = MainApp()
    window.show()

    # # Create the main window
    # window = QWidget()
    # window.setWindowTitle("Widget Positioning Example")
    # window.setGeometry(100, 100, 400, 300)

    # # Create a background label widget
    # background_label = QLabel("Background Label", parent=window)
    # background_label.setGeometry(50, 50, 200, 100)  # (x, y, width, height)
    # background_label.setStyleSheet("background-color: lightblue;")

    # # Create an overlay button widget
    # overlay_button = QPushButton("Overlay Button", parent=window)
    # overlay_button.setGeometry(100, 100, 200, 50)  # (x, y, width, height)
    # overlay_button.setStyleSheet("background-color: rgba(255, 0, 0, 100);")
    # overlay_button.raise_()  # Raise the button above the background label
    # window.show()
    sys.exit(app.exec_())

if __name__ == "__main__":
    main()
