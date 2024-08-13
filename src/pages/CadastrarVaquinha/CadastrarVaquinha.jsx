import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import HeaderIn from "../../components/HeaderIn";
import Footer from "../../components/Footer";
import styles from "./CadastrarVaquinha.module.css";
const CadastrarVaquinha = ({ estadosVaquinha = [], usuarios = [] }) => {
  const validationSchema = Yup.object().shape({
    titulo: Yup.string().required("Título é obrigatório"),
    descricao: Yup.string().required("Descrição é obrigatória"),
    file: Yup.mixed().test(
      "fileType",
      "Apenas arquivos de imagem são permitidos",
      (value) => {
        return (
          value &&
          value[0] &&
          ["image/jpeg", "image/png", "image/gif"].includes(value[0].type)
        );
      }
    ),
    categoria: Yup.string().required("Categoria é obrigatória"),
    subcategoria: Yup.string().required("Subategoria é obrigatória"),
    objectivo: Yup.number()
      .nullable()
      .required("Defina a quantia necessária")
      .typeError(
        "Quantia é obrigatória, digite 0 caso não precise de valores monetários"
      ),
    email: Yup.string()
      .nullable()
      .required("Email é obrigatório")
      .typeError("Email é obrigatório"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("file", data.file[0]); // Onde 'selectedFile' é o arquivo selecionado
    formData.append("email", data.email);
    formData.append("objectivo", data.objectivo);
    formData.append("subcategoria", data.subcategoria);
    formData.append("categoria", data.categoria);
    formData.append("descricao", data.descricao);
    formData.append("titulo", data.titulo);
    console.log(formData);
    // Aqui você pode fazer a chamada à API para salvar a vaquinha
    fetch("/api/add-vaquinha", {
      method: "POST", 
      body: formData, 
    })
      .then((response) => response.json()) 
      .then((data) => {
        console.log("Success:", data);
        window.location.href="/cadastroVaquinha";
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const [categorias, setCategorias] = useState([]);
  const [subcategorias, setSubcategorias] = useState([]);

  useEffect(() => {
    fetch("/api/get-categorias", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setSubcategorias(data.data);

        let category = [];

        for (let i = 0; i < data.data.length; i++) {
          if (data.data[i].categoria) {
            const cat = data.data[i].categoria;
            // Adiciona categoria se ainda não estiver no array
            if (!category.some((c) => c.id === cat.id)) {
              category.push(cat);
            }
          }
        }

        setCategorias(category);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, []);

  return (
    <div className="container_cadastrar">
      <HeaderIn />
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "5% 30% 5% 30%",
          gap: "30px",
          color: "#282828",
        }}
      >
        <h1>Vamos começar o processo de criação da vaquinha</h1>
        <div className={styles.element}>
          <h2>De quanto você precisa?</h2>
          <p>
            Defina sua meta para que doadores possam saber quanto falta para
            você chegar lá. Você pode editar esse valor quando quiser.
          </p>
          <input
            className={styles.form_style}
            type="number"
            {...register("objectivo")}
            placeholder="0,00KZ"
          />
          <p className={styles.error_message}>{errors.objectivo?.message}</p>
        </div>
        <div className={styles.element}>
          <h2>Defina um título para a sua vaquinha</h2>
          <input
            className={styles.form_style}
            type="text"
            {...register("titulo")}
            placeholder="Insira um titulo para a vaquinha"
          />
          <p className={styles.error_message}>{errors.titulo?.message}</p>
        </div>

        <div className={styles.element}>
          <h2>Defina uma descrição</h2>
          <textarea
            className={styles.form_style}
            {...register("descricao")}
            placeholder="Faça uma breve descrição...."
          />
          <p className={styles.error_message}>{errors.descricao?.message}</p>
        </div>

        <div className={styles.element}>
          <h2>Insira uma imagem</h2>
          <input
            className={styles.form_style}
            type="file"
            accept="image/*"
            {...register("file")}
          />
          <p className={styles.error_message}>
            {errors.file && <p>{errors.file.message}</p>}
          </p>
        </div>
        <div className={styles.element}>
          <h2>Defina a categoria em que sua vaquinha se encaixa</h2>
          <select {...register("categoria")} className={styles.form_style}>
            <option value="">Selecione uma categoria</option>
            {Array.isArray(categorias) &&
              categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.id}>
                  {categoria.nome}
                </option>
              ))}
          </select>
          <p className={styles.error_message}>{errors.categoria?.message}</p>
        </div>

        <div className={styles.element}>
          <p>A subcategoria é baseada na categoria selecionada</p>
          <select {...register("subcategoria")} className={styles.form_style}>
            <option value="">Selecione uma subcategoria</option>
            {Array.isArray(subcategorias) &&
              subcategorias.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.nome}
                </option>
              ))}
          </select>
          <p className={styles.error_message}>{errors.categoria?.message}</p>
        </div>

        <div className={styles.element}>
          <h2>Defina o seu email</h2>
          <input
            className={styles.form_style}
            type="email"
            {...register("email")}
            placeholder="Insira o seu email"
          />
          <p className={styles.error_message}>{errors.email?.message}</p>
        </div>

        <button type="submit" className={styles.botao_vaquinha1}>
          Continuar
        </button>
      </form>
      <Footer />
    </div>
  );
};

export default CadastrarVaquinha;
