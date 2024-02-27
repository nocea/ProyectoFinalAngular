import { Post } from "./post";
import { Usuario } from "./usuario";

export interface Comentario{
    texto_comentario:string;
    post_comentario:Post;
    usuario_comentario:Usuario | null;
}