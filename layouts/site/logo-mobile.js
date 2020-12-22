import Image from "components/image"
import Settings from "content/settings/settings.md"
// import Element from "content/elements/logo.md"

export default function LogoMobile({ logo = true, showMenu }) {
    const logoSettings = Settings.data.logo
    if (!logo) return null
    let Text = () => null
    let Img = () => null

    if (logoSettings.textinlogo) {
        Text = () => (
            <h1 className={logoSettings.text_classname_mobile}>
                {logoSettings.text_mobile}
            </h1>
        )
    }

    if (logoSettings.imageinlogo) {
        Img = () => (
            <Image
                className={logoSettings.image_classname_mobile}
                src={logoSettings.image}
                alt={logoSettings.alt}
                layout={logoSettings.layout}
                width={logoSettings.width}
                height={logoSettings.height}
            />
        )
    }

    // return (
    //     <div
    //         dangerouslySetInnerHTML={createMarkup(Element.data.content.code)}
    //     />
    // )

    return (
        <div id="logo" className={logoSettings.logo_classname_mobile}>
            <Img />
            <Text />
        </div>
    )
}

// function createMarkup(element) {
//     return {
//         __html: element,
//     }
// }
