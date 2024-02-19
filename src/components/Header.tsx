import SelectSmall from "./SelectLanguage";



function Header() {

    return (
        <>
            <div className="header">
                <div className="header-container">
                    <div className="header-logo" >

                    </div>
                    <div className="header-textbox">
                        <div className="header-title">
                            Test Smobilpay
                        </div>
                        <div style={{ fontSize: 14, color: '#777' }}>
                            Friedrichebert str,61,04347,Leipzig
                        </div>
                    </div>
                    <SelectSmall />
                </div>

            </div>
        </>
    )
}

export default Header;