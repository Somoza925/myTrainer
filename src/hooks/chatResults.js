import { useEffect, useState } from 'react';
import firebaseSDK from '../config/firebaseSDK';


export default () => {
    const[results, setResults] = useState([]);
    const[errorMessage, setErrorMessage] = useState('');

    function getChatIds (){
        const e = firebaseSDK.email;
		var userEmail = e.toLowerCase();
        userEmail = userEmail.replace(/\./g, ',');
        try {
            console.log("getting chat id's");
            firebaseSDK.getChatKeys(userEmail).then(data => {
                setResults(data);
                console.log(data.length);
            });
            
        } catch (err){
            setErrorMessage('Something went wrong with getting chats');
        }
        
    };

    useEffect(() => { // use this function one time when the component runs
        getChatIds();
    }, []);

    return [getChatIds, results, errorMessage]; // returning the things we need 
};