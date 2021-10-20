import { useEffect, useState } from 'react';
import { api } from '../../services/api';

import styles from './styles.module.scss'

import logoImg from '../../assets/logo.svg';

type Message = {
    id: string;
    text: string;
    user: {
        name: string;
        avatar_url: string;
    }
}

export function MessageList(){
    const [messages, setMessages] = useState<Message[]>([])


    useEffect(() => {
        api.get<Message[]>('messages/last3').then(response =>{

            setMessages(response.data);

        })
    }, [])

    return (

            <ul className={styles.messageList}>
                <div className={styles.messageListWrapper}>
                    {messages.map(messages =>{
                        return(
                        <li key={messages.id} className={styles.message}>
                            <p className={styles.messageContent}>
                                {messages.text}
                            </p>
                            <div className={styles.messageUser}>
                                <div className={styles.userImage}>
                                    <img src={messages.user.avatar_url} alt={messages.user.name}  />
                                </div>
                                <span>{messages.user.name}</span>
                            </div>
                        </li>
                        );
                    })}

                    <img src={logoImg} alt="DoWhile 2021"  />
                </div>
            </ul>
    )
}