import * as React from 'react';
import classnames from 'classnames';
//import { History } from 'history';
import {
    connect,
    MapDispatchToPropsFunction,
    MapStateToProps,
} from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Link, RouteProps } from 'react-router-dom';
import { compose } from 'redux';
import { pgRoutes } from '../../constants';
import { LogoutIcon } from '../../assets/images/sidebar/LogoutIcon';
import { ProfileIcon } from '../../assets/images/sidebar/ProfileIcon';
import { SidebarIcons } from '../../assets/images/sidebar/SidebarIcons';
import {
    changeUserDataFetch,
    logoutFetch,
    Market,
    selectCurrentMarket,
    selectUserInfo,
    selectUserLoggedIn,
    User,
    RootState,
} from '../../modules';

interface State {
    isOpenLanguage: boolean;
}

export interface ReduxProps {
    isLoggedIn: boolean;
    currentMarket: Market | undefined;
    user: User;
}

interface DispatchProps {
    logoutFetch: typeof logoutFetch;
}


export interface OwnProps {
    onLinkChange?: () => void;
	//history: History;
    changeUserDataFetch: typeof changeUserDataFetch;
}

type Props = OwnProps & ReduxProps & RouteProps & DispatchProps;

class NavBarComponent extends React.Component<Props , State> {
	public state = {
        isOpenLanguage: false,
    };
    public render() {
        const { isLoggedIn, location } = this.props;
		const address = location ? location.pathname : '';
        //const address = this.props.history.location ? this.props.history.location.pathname : '';
        const navbarClassName = classnames('pg-navbar');

        return (
            <div className={navbarClassName}>
                <div className="pg-navbar__header-settings">
					{this.renderProfileLink()}
					
					<div>
						{pgRoutes(isLoggedIn).map(this.renderNavItems(address))}
					</div>
					
					{this.renderLogout()}
                </div>
				
            </div>
        );
    }

	public renderNavItems = (address: string) => (values: string[], index: number) => {
        const { currentMarket } = this.props;

        const [name, url, img] = values;
        const path = url.includes('/trading') && currentMarket ? `/trading/${currentMarket.id}` : url;
        const isActive = (url === '/trading/' && address.includes('/trading')) || address === url;

        const iconClassName = classnames('pg-navbar-wrapper-nav-item-img', {
            'pg-navbar-wrapper-nav-item-img--active': isActive,
        });

		const stylesItem = {
			   padding:"0 10px 0 10px",
			   
		   };
        return (
            <Link to={path} key={index} className={`${isActive && 'route-selected'}`}>
                    <span style={stylesItem}>
					<SidebarIcons
                            className={iconClassName}
                            name={img}
                        />
					</span>	
                    <span>
                        <FormattedMessage id={name} />
                    </span>
            </Link>
        );
    };
	
	public renderProfileLink = () => {
        const { isLoggedIn, location } = this.props;
        
        const address = location ? location.pathname : '';
        const isActive = address === '/profile';

        const iconClassName = classnames('pg-navbar-wrapper-nav-item-img', {
            'pg-navbar-wrapper-nav-item-img--active': isActive,
        });
		
        return isLoggedIn && (
           
                <Link to="/profile" className={`${isActive && 'route-selected'}`}>
                    <div className="pg-navbar-wrapper-profile-link">
						<ProfileIcon className={iconClassName} />
                        <span className={`pg-navbar-wrapper-profile-link-text`}>
                            <FormattedMessage id={'page.header.navbar.profile'} />
                        </span>
                    </div>
                </Link>
           
        );
    };

    public renderLogout = () => {
        const { isLoggedIn } = this.props;
        if (!isLoggedIn) {
            return null;
        }

        return (
            <div className="pg-navbar-wrapper-logout">
                <div className="pg-navbar-wrapper-logout-link" onClick={this.props.logoutFetch}>
                    <LogoutIcon className="pg-navbar-wrapper-logout-link-img" />
                    <span className="pg-navbar-wrapper-logout-link-text">
                        <FormattedMessage id={'page.body.profile.content.action.logout'} />
                    </span>
                </div>
            </div>
        );
    };

}

const mapStateToProps: MapStateToProps<ReduxProps, {}, RootState> =
    (state: RootState): ReduxProps => ({
		isLoggedIn: selectUserLoggedIn(state),
		currentMarket: selectCurrentMarket(state),
		user: selectUserInfo(state),
    });

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> =
    dispatch => ({
        logoutFetch: () => dispatch(logoutFetch()),
        changeUserDataFetch: payload => dispatch(changeUserDataFetch(payload)),
    });

export const NavBar = compose(
    connect(mapStateToProps, mapDispatchToProps),
)(NavBarComponent) as any; // tslint:disable-line
