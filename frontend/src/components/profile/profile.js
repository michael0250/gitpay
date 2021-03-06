import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Route, Switch, HashRouter } from 'react-router-dom'
import { injectIntl, FormattedMessage } from 'react-intl'

import {
  Grid,
  Avatar,
  Typography,
  Button,
  Paper,
  ListItemIcon,
  ListItemText,
  MenuList,
  MenuItem,
  withStyles,
  Toolbar,
  AppBar,
} from '@material-ui/core'
import {
  DeviceHub,
  LibraryBooks,
  CreditCard,
  Tune,
  Person,
  ArrowBack
} from '@material-ui/icons'

import classNames from 'classnames'
import nameInitials from 'name-initials'

import api from '../../consts'

import TopBarContainer from '../../containers/topbar'
import Bottom from '../bottom/bottom'
import ProfileOptions from './profile-options'
import TaskListContainer from '../../containers/task-list'
import PaymentOptions from '../payment/payment-options'
import Preferences from './preferences'
import Organizations from './organizations'

import { Page, PageContent } from 'app/styleguide/components/Page'

import PreferencesBar from './preferences-bar'

const logoGithub = require('../../images/github-logo.png')
const logoBitbucket = require('../../images/bitbucket-logo.png')
const bannerDiscount = require('../../images/discount-99.png')

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  altButton: {
    marginRight: 10
  },
  bigRow: {
    marginTop: 40
  },
  row: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 10
  },
  rowList: {
    marginTop: 10,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  rowContent: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  infoItem: {
    width: '100%',
    textAlign: 'center'
  },
  menuContainer: {
    marginBottom: 40,
    marginRight: 20,
    marginLeft: 20,
    width: '100%'
  },
  menuItem: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& $primary, & $icon': {
        color: theme.palette.common.white
      }
    }
  },
  primary: {},
  icon: {
    marginRight: 5
  },
  secondaryBar: {
    backgroundColor: theme.palette.primary.light
  },
  chip: {
    marginRight: 10,
    marginBottom: 20
  },
  chipSkill: {
    margin: theme.spacing.unit,
  },
  chipLanguage: {
    margin: theme.spacing.unit,
  },
  chipContainer: {
    marginTop: 12,
    marginBottom: 12,
    width: '100%'
  }
})

class Profile extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selected: null
    }
  }

  componentWillMount () {
    this.setActive(this.props.location.pathname)
  }

  setActive (path) {
    switch (path) {
      case '/profile/tasks':
        this.setState({ selected: 0 })
        break
      case '/profile/payment-options':
        this.setState({ selected: 1 })
        break
      case '/profile/preferences':
        this.setState({ selected: 2 })
        break
      default:
        this.setState({ selected: null })
        break
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.location.pathname !== nextProps.location.pathname) {
      this.setActive(nextProps.location.pathname)
    }
  }

  getTitleNavigation = () => {
    if (this.state.selected === 0) {
      return (<FormattedMessage id='account.profile.tasks.setup' defaultMessage='Tasks' />)
    }
    else if (this.state.selected === 1) {
      return (<FormattedMessage id='account.profile.payment.setup' defaultMessage='Setup payment' />)
    }
    else {
      return (<FormattedMessage id='account.profile.preferences' defaultMessage='Preferences' />)
    }
  }

  handleBackToTaskList = () => {
    window.history.back()
  }

  render () {
    const { classes, user, preferences } = this.props

    let titleNavigation = this.getTitleNavigation()

    return (
      <Page>
        <TopBarContainer />
        <AppBar
          component='div'
          classes={ { colorPrimary: classes.secondaryBar } }
          color='primary'
          position='static'
          elevation={ 0 }>
          <Toolbar>
            <Grid container alignItems='center' spacing={ 8 }>
              <Grid item xs>
                <Typography color='primary' variant='title'>
                  <Button onClick={ this.handleBackToTaskList } variant='text' size='small' aria-label='Back' color='primary'>
                    <ArrowBack />
                  </Button>
                  <span style={ { marginLeft: 10 } }>
                    { titleNavigation }
                  </span>
                </Typography>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        { this.state.selected === 2 &&
          <PreferencesBar classes={ classes } />
        }
        <PageContent>
          <Grid container className={ classes.root } spacing={ 24 }>
            <Grid item xs={ 12 } md={ 3 }>
              <div className={ classes.bigRow }>
                <div className={ classes.row }>
                  { user.picture_url ? (
                    <Avatar
                      alt={ user.username }
                      src={ user.picture_url }
                      className={ classNames(classes.avatar, classes.bigAvatar) }
                    />
                  ) : (
                    <Avatar
                      alt={ user.username }
                      src=''
                      className={ classNames(classes.avatar, classes.bigAvatar) }
                    >
                      { user.name ? nameInitials(user.name) : (user.username ? nameInitials(user.username) : <Person />) }
                    </Avatar>
                  ) }
                </div>
                <div className={ classes.rowList }>
                  <div className={ classes.rowContent }>
                    <Button
                      disabled={ user.provider === 'github' }
                      href={ `${api.API_URL}/authorize/github` }
                      variant='contained'
                      size='small'
                      color='secondary'
                      className={ classes.altButton }
                    >
                      <img width='16' src={ logoGithub } className={ classes.icon } />{ ' ' }
                      Github
                    </Button>
                    <Button
                      disabled={ user.provider === 'bitbucket' }
                      href={ `${api.API_URL}/authorize/bitbucket` }
                      variant='contained'
                      size='small'
                      color='secondary'
                      className={ classes.altButton }
                    >
                      <img
                        width='16'
                        src={ logoBitbucket }
                        className={ classes.icon }
                      />{ ' ' }
                      Bitbucket
                    </Button>
                  </div>
                </div>
                <div className={ classes.rowList }>
                  <div className={ classes.infoItem }>
                    <Typography>{ user.name }</Typography>
                  </div>
                  <div className={ classes.infoItem }>
                    <Typography>
                      <a href={ user.website }>{ user.website }</a>
                    </Typography>
                  </div>
                  { user.repos && (
                    <div className={ classes.infoItem }>
                      <Typography>
                        <h4>
                          <DeviceHub />
                          <FormattedMessage id='account.profile.repo' defaultMessage='Repositories' />
                        </h4>
                        <p>{ user.repos }</p>
                      </Typography>
                    </div>
                  ) }
                </div>
                <div className={ classes.row }>
                  <Paper className={ classes.menuContainer }>
                    <MenuList>
                      <MenuItem
                        onClick={ () => this.props.history.push('/profile/tasks') }
                        className={ classes.menuItem }
                        selected={ this.state.selected === 0 }
                      >
                        <ListItemIcon className={ classes.icon }>
                          <LibraryBooks />
                        </ListItemIcon>
                        <ListItemText
                          classes={ { primary: classes.primary } }
                          inset
                          primary={
                            <span>
                              <FormattedMessage id='account.profile.tasks.setup' defaultMessage='Tasks' />
                            </span>
                          }
                        />
                      </MenuItem>
                      <MenuItem
                        onClick={ () => this.props.history.push('/profile/payment-options') }
                        className={ classes.menuItem }
                        selected={ this.state.selected === 1 }
                      >
                        <ListItemIcon className={ classes.icon }>
                          <CreditCard />
                        </ListItemIcon>
                        <ListItemText
                          classes={ { primary: classes.primary } }
                          inset
                          primary={
                            <span>
                              <FormattedMessage id='account.profile.payment.setup' defaultMessage='Setup payment' />
                            </span>
                          }
                        />
                      </MenuItem>
                      <MenuItem
                        onClick={ () => this.props.history.push('/profile/preferences') }
                        className={ classes.menuItem }
                        selected={ this.state.selected === 2 }
                      >
                        <ListItemIcon className={ classes.icon }>
                          <Tune />
                        </ListItemIcon>
                        <ListItemText
                          classes={ { primary: classes.primary } }
                          inset
                          primary={
                            <span>
                              <FormattedMessage id='account.profile.preferences' defaultMessage='Preferences' />
                            </span>
                          }
                        />
                      </MenuItem>
                    </MenuList>
                  </Paper>
                </div>
              </div>
            </Grid>
            <Grid item xs={ 12 } md={ 9 }>
              <Grid item xs={ 12 } md={ 12 }>
                <div style={ { marginTop: 10, marginBottom: 10, display: 'none' } }>
                  <Typography variant='h5' component='h3'>
                    <FormattedMessage id='account.profile.welcome.headline' defaultMessage='Welcome to Gitpay!' />
                  </Typography>
                  <Typography component='p'>
                    <FormattedMessage id='account.profile.welcome.description' defaultMessage='This is the first steps to start to work with Gitpay' />
                  </Typography>
                  <div style={ { marginTop: 20, marginBottom: 40 } }>
                    <Organizations />
                  </div>
                </div>
              </Grid>
              <div style={ { marginTop: 20, marginBottom: 20, textAlign: 'center', display: 'none' } }>
                <a href='https://app.turbomkt.com.br/checkout?tm=NLEAUIIG&fp=335084580644244&ga=UA-134720490-1&jc=dZZJJOyciC&src=gitpay'>
                  <img src={ bannerDiscount } width='450' />
                </a>
              </div>
              <HashRouter>
                <Switch>
                  <Route exact path='/profile' component={ ProfileOptions } />
                  <Route
                    exact
                    path='/profile/tasks'
                    component={ () => <TaskListContainer /> }
                  />
                  <Route
                    exact
                    path='/profile/payment-options'
                    component={ () => <PaymentOptions user={ user } /> }
                  />
                  <Route
                    exact
                    path='/profile/preferences'
                    component={ () => <Preferences user={ user } preferences={ preferences } classes={ classes } updateUser={ this.props.updateUser } fetchPreferences={ this.props.fetchPreferences } /> }
                  />
                </Switch>
              </HashRouter>
            </Grid>
          </Grid>
        </PageContent>
        <Bottom classes={ classes } />
      </Page>
    )
  }
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
  location: PropTypes.object,
  user: PropTypes.object,
  history: PropTypes.object
}

export default injectIntl(withStyles(styles)(Profile))
