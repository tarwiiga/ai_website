import * as Chakra from '@chakra-ui/react'
import {SaasProvider} from '@saas-ui/react'
import '../theme/globals.css'
import {theme} from "../theme";
import {Header} from "./header";
import React from "react";
import {Footer} from "./footer";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: {
        default: "Tarwiiga AI",
        template: "%s - Tarwiiga AI",
    },
    description: "Custom AI Agents for every business",
    twitter: {
        card: "summary_large_image"
    }
}

export default function Layout(props: { children: React.ReactNode }) {
    const colorMode = Chakra.theme.config.initialColorMode

    return (
        <html lang="en" data-theme={colorMode} style={{colorScheme: colorMode}}>
        <body className={`chakra-ui-${colorMode}`}>
        <Chakra.ColorModeScript initialColorMode={colorMode}/>
        <SaasProvider theme={theme}>
            <Header/>
            {props.children}
            {/*<Footer/>*/}
        </SaasProvider>
        </body>
        </html>
    )
}
