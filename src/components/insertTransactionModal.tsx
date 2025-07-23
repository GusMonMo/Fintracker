import { motion } from "framer-motion"
import styles from "../pages/Dashboard/styles.module.scss"
import { useForm } from "react-hook-form";


type TransacaoForm = {
  descricao: string;
  valor: string;
  tipo: "entrada" | "saida";
};

type InsertTransactionModalProps = {
    closeModal: () => void
}

export default function InsertTransactionModal({closeModal}: InsertTransactionModalProps){
    const {
        register,       // Registra os campos e conecta ao RHF
        handleSubmit,   // Controla o envio do form
        formState: { errors },  // Acessa os erros de validação
      } = useForm<TransacaoForm>(); // Tipamos para ter autocomplete e validação automática
    
      function onSubmit(data: TransacaoForm) {
        console.log("Dados enviados:", data);
      }

    return(
        <motion.section className={styles.insertTransactionSection}
        initial={{opacity: 0, scale: 0.2}}
        animate={{opacity: 1, scale: 1}}
        exit={{ scale: 0.2, opacity: 0 }}
        transition={{duration: 0.2, ease: "easeInOut"}}>
            <h1>Insert Transaction</h1>

            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                
                <section className={styles.formSubSection}>
                    <label><h2>Origem</h2></label>
                    <input {...register("descricao", { required: true })} />
                    {errors.descricao && <span>Campo obrigatório</span>}
                </section>

                <section className={styles.formSubSection}>
                <label><h2>Valor</h2></label>
                <input type="text" {...register("valor", { 
                    required: true,  
                    validate: (value) =>
                        !isNaN(Number(value)),})} />
                {errors.valor && <span>Campo obrigatório</span>}
                </section>

                <section className={styles.formSubSection}>
                    <label><h2>Tipo</h2></label>
                    <select {...register("tipo", { required: true })}>
                        <option value="">Selecione</option>
                        <option value="entrada">Entrada</option>
                        <option value="saida">Saída</option>
                    </select>
                    {errors.tipo && <span>Selecione o tipo</span>}
                </section>

      <button type="submit"> <h3>Registrar Transação</h3></button>
    </form>
            <button onClick={closeModal}><h3>Close</h3></button>
        </motion.section>
    )
}