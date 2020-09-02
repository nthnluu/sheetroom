import Document, {Html, Head, Main, NextScript} from 'next/document'

class MyDocument extends Document {
    // static async getInitialProps(ctx) {
    //     const initialProps = await Document.getInitialProps(ctx);
    //     return {...initialProps}
    // }

    render() {
        return (
            <Html>
                <Head title="Sheetroom">
                    <link rel="stylesheet" href="https://rsms.me/inter/inter.css"/>
                    <style id="react-mathquill-styles"/>
                    <script src="https://widget.cloudinary.com/v2.0/global/all.js" type="text/javascript"></script>
                    <script crossorigin
                            src="https://www.desmos.com/api/v1.5/geometry.js?apiKey=dcb31709b452b1cf9dc26972add0fda6"></script>

                    {/*Font Awesome Icons*/}
                    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.13.1/css/all.css"
                          integrity="sha384-xxzQGERXS00kBmZW/6qxqJPyxW3UR0BPsL4c8ILaIWXva5kFi7TxkIIaMiKtqV1Q"
                          crossOrigin="anonymous"/>

                    {/*Katex and Mathquill Css    */}
                    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.css"
                          integrity="sha384-qCEsSYDSH0x5I45nNW4oXemORUZnYFtPy/FqB/OjqxabTMW5HVaaH9USK4fN3goV"
                          crossOrigin="anonymous"/>
                    <script defer src="https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.js"
                            integrity="sha384-YFVvRUwgqxkAVN9bmAVLsKilmOKfQLyUx0ZlmDNs0aBUTsvMLnRxE3Km0NrZa0i9"
                            crossOrigin="anonymous"/>
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/mathquill/0.10.1/mathquill.css"
                          integrity="sha512-vPg9GqsZZ4LHv9BkFfZSXt7y4D7YaARPU2JFmpZug4EgtJJrumytMAFZkNSk2LSyqWir0TNbh2tBq7UJIMxvlA=="
                          crossOrigin="anonymous"/>
                </Head>
                <body>
                <Main/>
                <NextScript/>
                </body>
            </Html>
        )
    }
}

export default MyDocument
