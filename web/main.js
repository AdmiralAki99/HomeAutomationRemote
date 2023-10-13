function valueChanged(e){
	let a = e.value;
	e.style.background = `linear-gradient(to right,#D83A5C,#D83A5C ${a}%,#eee ${a}%)`;
}