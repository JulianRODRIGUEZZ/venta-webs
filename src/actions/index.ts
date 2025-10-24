import  { z } from "astro:schema";
import { ActionError, defineAction } from "astro:actions";
import { saveNewsletterEmail } from "../newsletter/services/suscribe";

export const server = {
    newsletter: defineAction({
        input: z.object ({
            email: z.string().email('Lo siento, el email no es valido')
        }),
        async handler({ email }) {
             const { success, duplicated, error  } = await saveNewsletterEmail(email)

            if (!success) {
                throw new ActionError({ 
                    code: "BAD_REQUEST",
                    message: error ?? "Error al guardar el email"
                })
            }
            if (duplicated) {
                return {
                    success: true,
                    message: "Este usuario ya se encuentra registrado"
                }
            }

            return {
                success: true,
                message: "!Te has registrado correctamente!"
            }


            //llamar a supabase
            // para guardar el email en la tabla newsletter
        }
        
    })
}