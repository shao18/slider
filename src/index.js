import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

function SayFullName(props){
	return (
		<div>
		<h1>Мое имя {props.name}, фамилия {props.surname}</h1>
		<a href={props.link}>ССылка на мой профиль</a>
		</div>
		)

}

ReactDOM.render(<SayFullName name="Вася" surname="Петров" link="http://vk.com/" />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
