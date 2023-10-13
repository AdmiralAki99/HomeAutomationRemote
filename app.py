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
    QScrollArea,
    QWidget,
)
from PySide6.QtCore import QSize,Qt

class MenuCardTitle(QLabel):
    def __init__(self, title,subtitle, *args, **kwargs):
        super(MenuCardTitle, self).__init__(*args, **kwargs)
        layout = QVBoxLayout()
        title_label = QLabel(title)
        title_label.setStyleSheet("font-size: 20px; font-weight: bold;")

        # Create a small subtitle label
        subtitle_label = QLabel(subtitle)
        subtitle_label.setStyleSheet("font-size: 14px; color: gray;")

        layout.addWidget(title_label)
        layout.addSpacing(5)
        layout.addWidget(subtitle_label)

        self.setLayout(layout)
        self.setFixedSize(QSize(200,100))
        # self.setStyleSheet("background-color: #f5f5f5; border-radius: 10px;")

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

        widgets[0].setStyleSheet("background-color: #000000;border-right: 0.5px solid gray;")
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
        with open("./homeScreenStyle.qss") as file:
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
            MenuCard([QLabel("Hello"),MenuCardTitle(title="Title",subtitle="Subtitle"),QPushButton(">")])
        ]
        
    def showMessage(self):
        self.label.setText("Button Clicked!")

def main():
    app = QApplication(sys.argv)
    window = MainApp()
    window.show()
    sys.exit(app.exec_())

if __name__ == "__main__":
    main()
