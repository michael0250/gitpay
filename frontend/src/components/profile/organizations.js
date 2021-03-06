import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Chip from '@material-ui/core/Chip'
import TagFacesIcon from '@material-ui/icons/TagFaces'

const styles = theme => ({
  root: {
    display: 'flex',

    flexWrap: 'wrap',
    padding: theme.spacing.unit / 2,
  },
  chip: {
    margin: theme.spacing.unit / 2,
  },
})

class Organizations extends Component {
  state = {
    chipData: [
      { key: 0, label: 'Angular' },
      { key: 1, label: 'jQuery' },
      { key: 2, label: 'Polymer' },
      { key: 3, label: 'React' },
      { key: 4, label: 'Vue.js' },
    ],
  };

  handleDelete = data => () => {
    if (data.label === 'React') {
      console.log('Why would you want to delete React?! :)') // eslint-disable-line no-console
      return
    }

    this.setState(state => {
      const chipData = [...state.chipData]
      const chipToDelete = chipData.indexOf(data)
      chipData.splice(chipToDelete, 1)
      return { chipData }
    })
  };

  render () {
    const { classes } = this.props

    return (
      <div className={ classes.root }>
        { this.state.chipData.map(data => {
          let icon = null

          if (data.label === 'React') {
            icon = <TagFacesIcon />
          }

          return (
            <Chip
              key={ data.key }
              icon={ icon }
              label={ data.label }
              onDelete={ this.handleDelete(data) }
              className={ classes.chip }
            />
          )
        }) }
      </div>
    )
  }
}

Organizations.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Organizations)
