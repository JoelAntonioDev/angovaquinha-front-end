import React, { useEffect, useState } from "react";
import styles from "./Container.module.css";
import CardVaquinha from "../CardVaquinha";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Accordion, AccordionTab } from 'primereact/accordion';

function Container() {
    const [vaquinhas, setVaquinhas] = useState([]);

    useEffect(() => {
        fetch("/api/get-vaquinhas", {
            method: "GET",
            headers: {
                "Content-type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                if (data.data && data.data.length > 0) {
                    setVaquinhas(data.data);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div className={styles.container_container}>
            <div className={styles.secao_banner}>
                <img src="/src/images/banner1.png" alt="Banner" />
            </div>
            <div className={styles.secao_citacao}>
                <blockquote>
                    <p>
                        "Cada contribuição, por menor que seja, faz uma grande diferença na vida de quem precisa.
                        Juntos, podemos transformar sonhos em realidade!"
                    </p>
                    <footer>— Doe hoje e faça a diferença</footer>
                </blockquote>
            </div>

            <div className={styles.secao_informacoes}>
                <h2>Como Ajudar</h2>
                <p>
                    Descubra como sua doação pode fazer a diferença. Cada contribuição ajuda a melhorar a vida de
                    pessoas que precisam.
                </p>
                <p>
                    Para mais informações sobre como participar, entre em contato com nossa equipe ou visite nosso site.
                </p>
            </div>

            <div className={styles.secao_impacto}>
                <h2>O Impacto das Doações</h2>
                <p>
                    As doações feitas através da nossa plataforma têm um impacto direto nas vidas de muitas pessoas. Veja
                    alguns exemplos de como suas contribuições ajudaram:
                </p>
                <ul>
                    <li>Ajuda a financiar tratamentos médicos para pessoas em necessidade.</li>
                    <li>Suporte a projetos educacionais e de capacitação profissional.</li>
                    <li>Assistência para famílias em situações de emergência.</li>
                </ul>
            </div>

            <div className={styles.secao_2}>
                <h2>Destaques</h2>
                <Card title="Informações Importantes" className="p-mb-3">
                    <p>Confira as campanhas mais populares e impactantes que estão fazendo a diferença. Estas vaquinhas
                        têm atraído muita atenção e apoio, e você pode contribuir para ajudar a alcançar os objetivos
                        estabelecidos.</p>
                </Card>
                <Carousel
                    showThumbs={false}
                    showStatus={false}
                    autoPlay={true}
                    interval={3000}
                    infiniteLoop={true}
                >
                    {vaquinhas.map((vaquinha, index) => {
                        const imagePath = vaquinha.caminhoImagem;
                        const relativeImagePath = imagePath.substring(imagePath.indexOf("imagens"));
                        const imageUrl = `http://localhost:8080/${relativeImagePath.replace("\\", "/")}`;

                        return (
                            <div key={index}>
                                <CardVaquinha
                                    id={vaquinha.id}
                                    titulo={vaquinha.titulo}
                                    descricao={vaquinha.descricao}
                                    objectivo={vaquinha.quantia}
                                    dataCriacao={vaquinha.dataCriacao}
                                    foto={imageUrl}
                                />
                            </div>
                        );
                    })}
                </Carousel>
            </div>

            <div className={styles.secao_testemunhos} style={{ marginTop: '200px' }}>
                <h2>O que dizem sobre nós</h2>
                <Card title="Testemunhos" className="p-mb-3">
                    <blockquote>
                        <p>"As campanhas da Vaquinha mudaram minha vida. Sou eternamente grato!"</p>
                        <footer>— Joel António</footer>
                    </blockquote>
                    <blockquote>
                        <p>"Uma plataforma incrível para fazer a diferença na vida das pessoas."</p>
                        <footer>— Romeu Bernardo</footer>
                    </blockquote>
                </Card>
            </div>

            <div className={styles.secao_faq}>
                <h2>Perguntas Frequentes</h2>
                <Accordion>
                    <AccordionTab header="Como posso fazer uma doação?">
                        <p>Você pode fazer uma doação diretamente através do nosso site ou entrar em contato com nossa equipe
                            para mais detalhes.</p>
                    </AccordionTab>
                    <AccordionTab header="Como as doações são usadas?">
                        <p>Todas as doações são destinadas a ajudar as campanhas e causas listadas em nosso site.</p>
                    </AccordionTab>
                    <AccordionTab header="Existe alguma taxa associada às doações?">
                        <p>Não, não cobramos taxas sobre as doações feitas através da nossa plataforma. Todo o valor doado vai
                            diretamente para a campanha escolhida.</p>
                    </AccordionTab>
                    <AccordionTab header="Como posso criar uma campanha?">
                        <p>Você pode criar uma campanha preenchendo nosso formulário de criação de campanha no site e submetendo
                            todas as informações necessárias.</p>
                    </AccordionTab>
                </Accordion>
            </div>

            <div className={styles.secao_contato}>
                <h2>Entre em Contato</h2>
                <p>Email: romeubernardo2017@gmail.com</p>
                <p>Email: joellucas2020eu@gmail.com</p>
                <p>Telefone: (00) 943943786</p>
                <p>Telefone: (00) 935 816 801</p>
                <p>Endereço: Angola, Luanda</p>
            </div>

            <div className={styles.secao_historia}>
                <h2>Nossa História</h2>
                <p>
                    A Vaquinha começou com o objetivo de ajudar pessoas em situações difíceis, reunindo contribuições para
                    causas que realmente importam. Desde o início, temos trabalhado para criar uma plataforma transparente e
                    eficaz para doações e campanhas. Nossa missão é fazer a diferença e transformar vidas por meio da solidariedade.
                </p>
            </div>

            <div className={styles.secao_equipe}>
                <h2>Conheça a Equipe</h2>
                <p>Nosso time é composto por pessoas dedicadas e apaixonadas por fazer a diferença. Aqui estão alguns dos membros principais:</p>
                <ul>
                    <li><strong>Joel António</strong> - Fundador e Diretor Executivo</li>
                    <li><strong>Romeu Bernardo</strong> - Fundador e Diretor Executivo</li>
                </ul>
            </div>

            <div className={styles.secao_parceiros}>
                <h2>Nossos Parceiros</h2>
                <p>Trabalhamos com várias organizações e empresas para maximizar o impacto das nossas campanhas:</p>
                <ul>
                    <li>Organização X</li>
                    <li>Empresa Y</li>
                    <li>Instituição Z</li>
                </ul>
            </div>

            <div className={styles.secao_blog}>
                <h2>Blog</h2>
                <p>Acompanhe nosso blog para ler as últimas notícias e histórias inspiradoras sobre nossas campanhas e impacto.</p>
                <a href="/login">Visite nosso blog</a>
            </div>
        </div>
    );
}

export default Container;
