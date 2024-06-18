// import {authMeAPI} from "../../api/authMeAPI";
//
// const initialState = {
//     data: {
//         id: null,
//         email: '',
//         login: ''
//     }
// };
//
// const AUTH_ME_SUCCESS = 'AUTH_ME_SUCCESS';
//
// export const ProfilePageReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case AUTH_ME_SUCCESS:
//             return {
//                 ...state,
//                 data: {
//                     ...state.data,
//                     ...action.payload
//                 }
//             };
//         default:
//             return state;
//     }
// };
//
// export const authMeActionCreator = (payload) => ({
//     type: AUTH_ME_SUCCESS,
//     payload
// });
//
// export const authMeThunkCreator = () => {
//     return async (dispatch) => {
//         try {
//             const data = await authMeAPI.authMe();
//             if (data.resultCode === 0) {
//                 dispatch(authMeActionCreator(data.data));
//                 debugger
//             } else {
//                 // Handle error here, maybe dispatch an error action
//                 console.error('Authentication failed:', data.messages);
//             }
//         } catch (error) {
//             console.error('Error:', error);
//             // Handle error here, maybe dispatch an error action
//         }
//     };
// };


/*

App.js



import { getPost } from './store-thunk/action/posts'
function App () {
    const posts = useSelector(state => state.posts.posts)

    return (
        <div className={}>Hello My friend</div>
        <button onClick={() => {}}></button>
        <button onClick={() => useDispatch(getPost())}>Load Posts</button>
        {posts.map((post)=> <div key={post.id}>{post.titile}</div>)}
    )
}

posts.js

function getPost() {
    return async(dispatch) => {
        const data = await apiPost()
        dispatch(LoadActionCreator(data))
    }
}

function LoadActionCreator (payload) {
    type: 'LOAD',
        payload
}


APIposts.js

async function apiPost() {
const res = await fetch('https://justboostfut.com/todos')
const data = await res.json()
return data.map((post => { id: post.id, title: post.title}))
}


===>>>> Reducer


---------------------------------------------------------------------------------------------------------------------



// Функия которая принимает State, и action
// Action {  type: '', payload - те данные на которые мы изменяем }

// Как работают подходы Redux?

/* Мутабильность - тобешь когда мы можем мутировать наши изменения, это когда у нас есть какой то обьект и мы можем дописать какие то поля
 или прописать новое поля - новое значение, не изменяя ссылку на наш обьект, мы знаем что обьекты - массивы, это все ссылочные типы данных,
 и когда мы переписываем наши значение мы переписываем нашу ссылку


   Имютабильность - когда мы взаимодействуем с Reduxom у нас изменения какого либо парамеметра в нашем store в нашем state происходит в формате, что
   мы меняем каждый раз ссылку.


   Мутабельность (Mutable):

Это свойство данных, которые могут быть изменены после их создания.
В вашем описании упоминается, что мы можем изменить поля объекта, не изменяя саму ссылку на объект. Это верно. Мутабельные объекты, такие как массивы в JavaScript, могут быть изменены, и при этом ссылка на объект остается той же самой.
Например:
javascript
Copy code
const obj = { name: "John" };
obj.name = "Jane"; // Мы изменили поле объекта без изменения самой ссылки
Иммутабельность (Immutable):

Это свойство данных, которые не могут быть изменены после их создания. Вместо этого создается новая версия данных.
В вашем описании упоминается, что при изменении параметра в Redux происходит изменение ссылки. В Redux принято использовать иммутабельные обновления состояния, где каждое изменение создает новый объект состояния, чтобы обеспечить предсказуемость и легко отслеживаемые изменения в приложении.
Например:
javascript
Copy code
const obj = { name: "John" };
const newObj = { ...obj, name: "Jane" }; // Создается новый объект с измененным полем
В обоих случаях, правильное понимание и использование мутабельности и иммутабельности зависит от контекста приложения и требований к нему.


Что делает THUNK?

-он как оболочка , он как промежуточное значение берет наш action , resolved его, берет наше значение, засовывает в useDispatch и мы может как раз обновить наш сторе



*/

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import Newsfeed from './Newsfeed';

test('Adds a new post', () => {
    render(
        <Provider store={store}>
            <Newsfeed />
        </Provider>
    );

    // Mock post data
    const newPostText = 'Testing a new post';
    const addPostButton = screen.getByRole('button', { name: /add post/i });

    // Simulate adding a new post
    fireEvent.click(addPostButton);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: newPostText } });
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    // Check if the new post appears in the newsfeed
    expect(screen.getByText(newPostText)).toBeInTheDocument();
});


