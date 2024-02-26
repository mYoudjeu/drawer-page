import SelectSmall from "./SelectLanguage";
import { useTranslation } from "react-i18next";


function Header() {

    const { t } = useTranslation()

    return (
        <>
            <div className="header">
                <div className="header-container">
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div className="header-logo" >

                        </div>
                        <div className="header-textbox">
                            <div className="header-title">
                                {t('header.title')}
                            </div>
                            <div style={{ fontSize: 14, color: '#777' }}>
                                {t('header.address')}
                            </div>
                        </div>
                    </div>
                    <div className="select">
                        <SelectSmall />
                    </div>
                </div>

            </div>
        </>
    )
}

export default Header;