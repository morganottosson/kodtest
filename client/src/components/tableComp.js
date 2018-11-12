import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    table: {
        padding: theme.spacing.unit,
    },
    tableCell: {
        fontSize: 18,
        [theme.breakpoints.down('xs')]: {
            fontSize: '32px',
        },
    }
});
  

class TableComp extends Component { 
    constructor(props) {
        super(props);

        this.state = {
            asc: true
        };

        this.sortTitle = this.sortTitle.bind(this);
        this.sortYear = this.sortYear.bind(this);
        this.compareTitle = this.compareTitle.bind(this);
        this.compareYear = this.compareYear.bind(this);
        this.changeAsc = this.changeAsc.bind(this);
    }

    changeAsc() {
        this.setState({
            asc: !this.state.asc
        });
    }

    compareTitle(a,b) {
        let { asc } = this.state;
        const titleA = a.Title.toUpperCase();
        const titleB = b.Title.toUpperCase();

        let comparison = 0;
        if (titleA > titleB) {
            comparison = 1;
        } else if (titleA < titleB) {
            comparison = -1;
        }

        if (asc) {
            this.changeAsc();
            return comparison * -1;
        } else {
            this.changeAsc();
            return comparison;
        }
    }

    compareYear(a,b) {
        let { asc } = this.state;

        let comparison = 0;
        if (a.Year > b.Year) {
            comparison = 1;
        } else if (a.Year < b.Year) {
            comparison = -1;
        }

        if (asc) {
            this.changeAsc();
            return comparison * -1;
        } else {
            this.changeAsc();
            return comparison;
        }
    }

    sortTitle() {
        let results = this.props.results.slice();
        results.sort(this.compareTitle);
        this.props.saveSort(results);
    }

    sortYear() {
        let results = this.props.results.slice();
        results.sort(this.compareYear);
        this.props.saveSort(results);
    }

    render() {
        let { results, classes } = this.props;
        console.log(results)

        return (
            <Paper>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow style={{cursor: 'pointer', }}>
                    <TableCell className={classes.tableCell} onClick={this.sortTitle}>Title</TableCell>
                    <TableCell className={classes.tableCell} numeric onClick={this.sortYear}>Year</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {results.map(row => {
                    return (
                      <TableRow key={row.imdbID} style={{cursor: 'pointer'}} onClick={() => window.open('http://www.imdb.com/title/' + row.imdbID, "_blank")}>
                        <TableCell className={classes.tableCell} component="th" scope="row">
                          {row.Title}
                        </TableCell>
                        <TableCell className={classes.tableCell} numeric>{row.Year}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Paper>
          );
    }
}

export default withStyles(styles)(TableComp);