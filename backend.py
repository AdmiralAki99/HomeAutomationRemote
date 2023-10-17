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

        
class VerticalMenuIcons(QLabel):
    def __init__(self,icons,*args,**kwargs):
        super(VerticalMenuIcons, self).__init__(*args, **kwargs)

        layout = QVBoxLayout()

        for path in icons:
            icon = QIcon(path)
            button = QPushButton()
            button.setStyleSheet("background-color: #000000;border-right: 0px;")
            button.setIcon(icon)
            layout.addWidget(button)

        self.setLayout(layout)
        self.setFixedSize(QSize(50,100))

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
        layout.setSpacing(0)

        title_label = QLabel("Do I Wanna Know?")
        title_label.setWordWrap(True)
        artist_label = QLabel("Arctic Monkeys")
        artist_label.setWordWrap(True)
        artist_label.setStyleSheet("color: white;font-size: 9px;")
        title_label.setStyleSheet("color: white;font-size: 12px;")
        sublayout.addWidget(title_label)
        sublayout.addWidget(artist_label)
        layout.addLayout(sublayout)

        self.setLayout(layout)

class PlaybackModule(QLabel):
    is_playing = False

    def __init__(self, *args,**kwargs):
        super(PlaybackModule, self).__init__(*args, **kwargs)
        layout = QHBoxLayout()
        musicMetadata = MusicMetadata()
        layout.addWidget(musicMetadata)
        musicMetadata.setFixedSize(QSize(130,50))
        layout.setSpacing(0)
        
        playback_layout = QHBoxLayout()
        playback_layout.setSpacing(0)

        rewind_button = QPushButton()
        icon = QIcon("./icons/icons8-rewind-50.png")
        rewind_button.setIcon(icon)
        rewind_button.clicked.connect(self.on_rewind_clicked)
        playback_layout.addWidget(rewind_button)
        rewind_button.setFixedWidth(30)

        play_button = QPushButton()
        icon = QIcon("./icons/icons8-play-50.png")
        play_button.setIcon(icon)
        play_button.clicked.connect(self.on_play_clicked)
        playback_layout.addWidget(play_button)
        play_button.setFixedWidth(30)

        forward_button = QPushButton()
        icon = QIcon("./icons/icons8-fast-forward-50.png")
        forward_button.setIcon(icon)
        forward_button.clicked.connect(self.on_forward_clicked)
        playback_layout.addWidget(forward_button)
        forward_button.setFixedWidth(30)

        layout.addLayout(playback_layout)
        layout.setSpacing(0)

        self.setLayout(layout)

    def on_play_clicked(self):
        if self.is_playing:
            self.is_playing = False
            icon = QIcon("./icons/icons8-pause-50.png")
            self.sender().setIcon(icon)
        else:
            self.is_playing = True
            icon = QIcon("./icons/icons8-play-50.png")
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
        title_label.setFixedSize(QSize(300,50))

        volume_layout = QHBoxLayout()
        volume_layout.setSpacing(0)

        rewind_button = QPushButton()
        icon = QIcon("./icons/icons8-low-volume-50.png")
        rewind_button.setIcon(icon)
        rewind_button.setStyleSheet("color: #FFFFFF;")
        volume_layout.addWidget(rewind_button)

        # Create a small subtitle label
        volume_slider = QSlider(Qt.Orientation.Horizontal)
        volume_slider.raise_()
        with open("./stylesheets/homeScreenSliderStyle.qss") as file:
            style = file.read()
            volume_slider.setStyleSheet(style)
        volume_layout.addWidget(volume_slider)

        forward_button = QPushButton()
        icon = QIcon("./icons/icons8-volume-50.png")
        forward_button.setIcon(icon)
        volume_layout.addWidget(forward_button)

        layout.addWidget(title_label)
        layout.addSpacing(2)
        layout.addLayout(volume_layout)

        self.setLayout(layout)
        self.setFixedSize(QSize(300,100))

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

        overlay_label2 = QLabel(parent=overlay_label)  # Overlay label
        overlay_label2.move(7.5,7.5)
        overlay_label2.resize(70,70)
        overlay_label2.setStyleSheet("border: 1px solid #AAA9A9;border-radius: 35px;background-color: #AAA9A9;")

        overlay_label3 = QLabel(parent=overlay_label2)  # Overlay label
        overlay_label3.move(10.5,10.5)
        overlay_label3.resize(50,50)
        overlay_label3.setStyleSheet("border: 1px solid white;border-radius: 25px;background-color: #FFFFFF;")

        overlay_label3 = QLabel(parent=overlay_label3)  # Overlay label
        overlay_label3.move(21,21)
        overlay_label3.resize(10,10)
        overlay_label3.setStyleSheet("border: 1px solid black;border-radius: 5px;background-color: #000000;")

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

    def __init__(self, widgets,function, *args, **kwargs):
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

        if function is not None:
            widgets[2].clicked.connect(function)

        # self._dial = QDial()
        # layout.addWidget(self._dial)

        self.setLayout(layout)
        self.setStyleSheet("background-color: #000000; border-radius: 0px;")
        self.setFixedSize(QSize(300,200))
        

class LightScreen(QMainWindow):
    def __init__(self,*args,**kwargs):
        super(LightScreen, self).__init__(*args, **kwargs)


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
            scroll.setStyleSheet(style)

    def init_menu_cards(self):
        self.widgets = [
            MenuCard([VerticalMenuIcons(icons=["./icons/icons8-moon-50.png","./icons/icons8-sun-50.png","./icons/icons8-winter-50.png"]),MenuCardTitle(title="Title",subtitle="Subtitle"),QPushButton(">")],function=self.showMessage),
            MenuCard([QLabel("Hello"),MenuCardTitle(title="Title",subtitle="Subtitle"),QPushButton(">")],function=self.showMessage),
            MusicMenuCard([VerticalMenuIcons(icons=[QIcon('./icons/icons8-moon-50.png'),QIcon('./icons/icons8-sun-50.png'),QIcon('./icons/icons8-winter-50.png')]),MenuCardTitle(title="Title",subtitle="Subtitle"),QPushButton(">")]),
            MenuCard([VerticalMenuIcons(icons=["./icons/icons8-light-50.png"]),MenuCardTitle(title="Title",subtitle="Subtitle"),QPushButton(">")],function=self.clicked_light_button),
            MenuCard([QLabel("Hello"),MenuCardTitle(title="Title",subtitle="Subtitle"),QPushButton(">")],self.showMessage),
            MenuCard([QLabel("Hello"),MenuCardTitle(title="Title",subtitle="Subtitle"),QPushButton(">")],self.showMessage),
            MenuCard([QLabel("Hello"),MenuCardTitle(title="Title",subtitle="Subtitle"),QPushButton(">")],self.showMessage),
        ]
        
    def showMessage(self):
        print("Show Message")

    def clicked_light_button(self):
        stacked_widget.setCurrentWidget(light_screen)

