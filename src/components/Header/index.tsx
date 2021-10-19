import styles from './styles.module.scss'
import Image from 'next/image'
import logo from '../../../public/images/logo.svg'
import { ActiveLink } from '../ActiveLink'

export function Header() {
    return (
        <header className={styles.headerContainer}>
           <div className={styles.headerContent}>
                <ActiveLink href="/" activeClassName={styles.active}>
                    <a>
                        <Image src={logo} alt="Empresa Logo" />
                    </a>
                </ActiveLink>
                <nav>
                    <ActiveLink href="/" activeClassName={styles.active} >
                        <a>Home</a>
                    </ActiveLink>
                    <ActiveLink href="/posts" activeClassName={styles.active}>
                        <a>Conteúdos</a>
                    </ActiveLink>
                    <ActiveLink href="/sobre" activeClassName={styles.active}>
                        <a>Quem Somos</a>
                    </ActiveLink>
                </nav>
                <a className={styles.readyButton} type="button" href="https://sujeitoprogramador.com">
                    Começar
                </a>
           </div>
        </header>
    )
}