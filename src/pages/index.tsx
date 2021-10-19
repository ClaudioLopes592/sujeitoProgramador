import { GetStaticProps } from 'next';
import Head from 'next/head';
import styles from '../styles/home.module.scss';

import Image from 'next/image';

import techsImage from '../../public/images/techs.svg';
import bannerConteudos from '../../public/images/banner-conteudos.png';

import { getPrismicClient } from '../services/prismic';
import Prismic from '@prismicio/client';
import { RichText } from 'prismic-dom';

type Content = {
    title: string;
    titleContent: string;
    linkAction: string;
    mobileTitle: string;
    mobileContent: string;
    mobileBanner: string,
    webTitle: string;
    webContent: string;
    webBanner: string;
}

interface ContentProps {
  content: Content;
}

export default function Home( {content}: ContentProps ) {
  return (
    <>
     <Head>
       <title>Apaixonado por tecnologia - Empresa</title>
     </Head>
     <main className={styles.container}>
        <div className={styles.containerHeader}>
            <section className={styles.ctaText}>
              <h1>{content.title}</h1>
              <span>{content.titleContent}</span>
              <a href={content.linkAction}>
                <button>
                  Começar Agora
                </button>
              </a>
            </section>
            <Image src={bannerConteudos} alt="Conteúdo Empresa" />
        </div>
        <hr className={styles.divisor} />
        <div className={styles.sectionContent}>
          <section>
            <h2>{content.mobileTitle}</h2>
            <span>{content.mobileContent}</span>
          </section>
          <img src={content.webBanner} alt="Conteúdo desenvolvimento de apps" />
        </div>
        <hr className={styles.divisor} />
        <div className={styles.sectionContent}>
          <img src={content.mobileBanner} alt="Conteúdo desenvolvimento de aplicações web" />
          <section>
            <h2>{content.webTitle}</h2>
            <span>{content.webContent}</span>
          </section>
        </div>
        <div className={styles.nextLevelContent}>
            <Image quality={100} src={techsImage} alt="Tecnologia" />
            <h2>Mais de <span className={styles.alunos}>15 mil</span> já levaram sua carreira ao próximo nível.</h2>
            <span>E você vai perder a chance de evoluir de uma vez por todas?</span>
            <a href={content.linkAction}>
              <button>Acessar Turma</button>
            </a>
        </div>
     </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {

  const prismic = getPrismicClient();
  const response = await prismic.query([
    Prismic.Predicates.at('document.type', 'home')
  ])

  const {
    title, sub_title, link_action,
    mobile, mobile_content, mobile_banner,
    title_web, web_content, web_banner
  } = response.results[0].data;

  const content = {
    title: RichText.asText(title),
    titleContent: RichText.asText(sub_title),
    linkAction: link_action.url,
    mobileTitle: RichText.asText(mobile),
    mobileContent: RichText.asText(mobile_content),
    mobileBanner: mobile_banner.url,
    webTitle: RichText.asText(title_web),
    webContent: RichText.asText(web_content),
    webBanner: web_banner.url
  }

  return {
    props: {
      content
    },
    revalidate: 60 * 2 //A cada 2 minutos
  }
}
