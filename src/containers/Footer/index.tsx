import * as React from 'react';
import classnames from 'classnames';
import { RouterProps } from 'react-router';
import {
    connect,
    MapDispatchToPropsFunction,
    MapStateToProps,
} from 'react-redux';
import { Moon } from '../../assets/images/Moon';
import { Sun } from '../../assets/images/Sun';
import { colors } from '../../constants';
import { compose } from 'redux';
//import { withRouter } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import { languages } from '../../api/config';
import {
	changeLanguage,
    changeUserDataFetch,
	RootState,
	selectCurrentLanguage,
	selectUserLoggedIn,
	selectUserInfo,
    User,
	changeColorTheme,
    selectCurrentColorTheme,
} from '../../modules';

interface State {
    isOpenLanguage: boolean;
}

interface DispatchProps {
	changeColorTheme: typeof changeColorTheme;
    changeLanguage: typeof changeLanguage;
	changeUserDataFetch: typeof changeUserDataFetch;
}
export interface ReduxPropsFooter {
	colorTheme: string;
	lang: string;
	isLoggedIn: boolean;
    user: User;
}

/*export interface OwnProps {
    //onLinkChange?: () => void;
	//history: History;
    changeUserDataFetch: typeof changeUserDataFetch;
}
*/

type Props = ReduxPropsFooter & RouterProps & DispatchProps;

class FooterComponent extends React.Component<Props, State> {
	public state = {
        isOpenLanguage: false,
    };
	
    public render() {
        /*if (this.props.history.location.pathname.startsWith('/confirm')) {
            return <React.Fragment />;
        }*/
		
		const { colorTheme, lang } = this.props;
		const languageName = lang.toUpperCase();
		const { isOpenLanguage } = this.state;
		const languageClassName = classnames('dropdown-menu-language-field', {
            'dropdown-menu-language-field-active': isOpenLanguage,
        });

        return (
            <React.Fragment>
                <footer className="pg-footer-container">
					<div className="pg-footer-container-left">
						<div className="btn-group pg-navbar__header-settings__account-dropdown dropdown-menu-language-container">
							<Dropdown>
								<Dropdown.Toggle variant="primary" id={languageClassName}>
									<img
										src={this.tryRequire(lang) && require(`../../assets/images/sidebar/${lang}.svg`)}
										alt={`${lang}-flag-icon`}
									/>
									<span className="dropdown-menu-language-selected">{languageName}</span>
								</Dropdown.Toggle>
								<Dropdown.Menu>
									{this.getLanguageDropdownItems()}
								</Dropdown.Menu>
							</Dropdown>
						</div>
					</div>
					<div className="pg-footer-container-center"> 
						<span>Powered by</span>
						<a href="https://koinmudra.com">KM Innovations Pvt Ltd</a>
					</div>
					
					
					<div className="pg-footer-container-right">
                        <div className="pg-navbar__header-settings__switcher__items"
                            onClick={e => this.handleChangeCurrentStyleMode(colorTheme === 'light' ? 'basic' : 'light')}
                        >
                            {this.getLightDarkMode()}
                        </div>
                    </div>
					
                </footer>
            </React.Fragment>
        );
    }
	
	public getLanguageDropdownItems = () => {
        return languages.map((l: string) =>
            <Dropdown.Item onClick={e => this.handleChangeLanguage(l)}>
                <div className="dropdown-row">
                    <img
                        src={this.tryRequire(l) && require(`../../assets/images/sidebar/${l}.svg`)}
                        alt={`${l}-flag-icon`}
                    />
                    <span>{l.toUpperCase()}</span>
                </div>
            </Dropdown.Item>,
        );
    };
	
	private handleChangeLanguage = (language: string) => {
        const { user, isLoggedIn } = this.props;

        if (isLoggedIn) {
            const data = user.data && JSON.parse(user.data);

            if (data && data.language && data.language !== language) {
                const payload = {
                    ...user,
                    data: JSON.stringify({
                        ...data,
                        language,
                    }),
                };

                this.props.changeUserDataFetch({ user: payload });
            }
        }

        this.props.changeLanguage(language);
    };
	
	private tryRequire = (name: string) => {
        try {
            require(`../../assets/images/sidebar/${name}.svg`);

            return true;
        } catch (err) {
            return false;
        }
    };
	
	
	private handleChangeCurrentStyleMode = (value: string) => {
        this.props.changeColorTheme(value);
    };
	
	private getLightDarkMode = () => {
        const { colorTheme } = this.props;

        if (colorTheme === 'basic') {
            return (
                <React.Fragment>
                    <div className="switcher-item">
                        <Sun fillColor={colors.light.navbar.sun}/>
                    </div>
                    <div className="switcher-item switcher-item--active">
                        <Moon fillColor={colors.light.navbar.moon}/>
                    </div>
                </React.Fragment>
            );
        }

        return (
            <React.Fragment>
                <div className="switcher-item switcher-item--active">
                    <Sun fillColor={colors.basic.navbar.sun}/>
                </div>
                <div className="switcher-item">
                    <Moon fillColor={colors.basic.navbar.moon}/>
                </div>
            </React.Fragment>
        );
    };

}


// tslint:disable-next-line:no-any
/*const Footer = withRouter(FooterComponent as any) as any;

export {
    Footer,
};*/

const mapStateToProps: MapStateToProps<ReduxPropsFooter, {}, RootState> =
    (state: RootState): ReduxPropsFooter => ({
		colorTheme: selectCurrentColorTheme(state),
		isLoggedIn: selectUserLoggedIn(state),
		lang: selectCurrentLanguage(state),
		user: selectUserInfo(state),
    });

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> =
    dispatch => ({
		changeColorTheme: payload => dispatch(changeColorTheme(payload)),
		changeLanguage: payload => dispatch(changeLanguage(payload)),
		changeUserDataFetch: payload => dispatch(changeUserDataFetch(payload)),
    });

export const Footer = compose(
    connect(mapStateToProps, mapDispatchToProps),
)(FooterComponent) as any; // tslint:disable-line

