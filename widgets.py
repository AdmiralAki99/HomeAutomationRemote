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
    QWidget,
)
from PySide6.QtCore import QSize
from PySide6.QtCore import QSize

class MenuCardTitle(QLabel):
    def __init__(self, title,subtitle, *args, **kwargs):
        super(MenuCardTitle, self).__init__(*args, **kwargs)
        self.setText(title)
        self.setStyleSheet("font-size: 20px;")

class MenuCard(QWidget):

    def __init__(self, widgets, *args, **kwargs):
        super(MenuCard, self).__init__(*args, **kwargs)

        layout = QHBoxLayout()
        leftSubLayout = QVBoxLayout()
        leftSubLayout.addWidget(widgets[0])
        layout.addLayout(leftSubLayout)
        layout.addWidget(widgets[1])
        layout.addWidget(widgets[2])

        # self._dial = QDial()
        # layout.addWidget(self._dial)

        self.setLayout(layout)

class LightScreen(QMainWindow):
    pass

class MainApp(QMainWindow):
    widgets = None

    def __init__(self):
        super().__init__()
        self.setFixedSize(QSize(720,720))
        layout = QVBoxLayout()
        self.init_menu_cards()
        for widgets in self.widgets:
            layout.addWidget(widgets)

        centralWidget = QWidget()
        centralWidget.setLayout(layout)
        self.setCentralWidget(centralWidget)

    def init_menu_cards(self):
        self.widgets = [
            MenuCard([QDial(),QLabel("Text"),QDial()]),
            MenuCard([QLabel("Hello"),MenuCardTitle(title="Title",subtitle="Subtitle"),QDial()])
        ]
        
    def showMessage(self):
        self.label.setText("Button Clicked!")
