import { Usuario } from "./usuario";

export interface Post{
    id: string;
    ruta_imagen:string| null;
    titulo_imagen:string;
    pie_imagen:string;
    usuario:Usuario | null;
}