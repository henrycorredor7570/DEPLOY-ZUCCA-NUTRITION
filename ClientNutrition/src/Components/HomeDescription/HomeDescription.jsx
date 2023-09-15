import styles from "./HomeDescription.module.css"
export default function HomeDescription(props) {
    
    return (
        <div>
            <div className={styles.title}>{props.title}</div>
            <div className={styles.description}>{props.description}</div>
        </div>
    )
} 