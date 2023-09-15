import style from "./Footer.module.css"
import TermsAndConditions from "../TermsAndConditions/TermsAndConditions";

export default function Footer() {
    return (
        <div className={style.container}>
            <TermsAndConditions />
        </div>
    )
}