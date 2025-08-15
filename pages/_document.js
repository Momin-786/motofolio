import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        return (
            <Html lang="en">
                <Head />
                <body>
                    <Main />
                    <NextScript />
                    
                    {/* Botpress Webchat Integration v3.2 */}
                    <script 
                        src="https://cdn.botpress.cloud/webchat/v3.2/inject.js" 
                        defer 
                    />
                    <script 
                        src="https://files.bpcontent.cloud/2025/08/11/14/20250811140816-HLBM1UDA.js" 
                        defer 
                    />
                </body>
            </Html>
        )
    }
}

export default MyDocument