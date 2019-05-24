import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Switch from '@material-ui/core/Switch';
import { ConfigContext } from '../context';
import Input from '@material-ui/core/Input';


const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
});


class SwitchListSecondary extends React.Component {
    render() {
        const { classes } = this.props
        return (
            <ConfigContext.Consumer>{
                config => {
                    return (
                        <div>
                            <List subheader={<ListSubheader>主题</ListSubheader>} className={classes.root}>
                                <ListItem>
                                    <ListItemText primary="深色背景" />
                                    <ListItemSecondaryAction>
                                        <Switch
                                            onChange={config.handleThemeChange}
                                            checked={config.theme === 'dark'}
                                        />
                                    </ListItemSecondaryAction>
                                </ListItem>
                            </List>
                            <List subheader={<ListSubheader>画布大小</ListSubheader>} className={classes.root}>
                                <ListItem>
                                    <ListItemText primary="宽" />
                                    <ListItemSecondaryAction>
                                        <Input value={config.size.width} type="number" onChange={config.handleChange('width')} />
                                    </ListItemSecondaryAction>
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="高" />
                                    <ListItemSecondaryAction>
                                        <Input value={config.size.height} type="number" onChange={config.handleChange('height')} />
                                    </ListItemSecondaryAction>
                                </ListItem>
                            </List>

                            <List subheader={<ListSubheader>内容配置</ListSubheader>} className={classes.root}>
                                {/* <ListItem>
                                    <ListItemText primary="正方形比例" />
                                    <ListItemSecondaryAction>
                                        <Input value={config.content.rect} type="number" onChange={config.handleChange('rect')} />
                                    </ListItemSecondaryAction>
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="三角形比例" />
                                    <ListItemSecondaryAction>
                                        <Input value={config.content.triangle} type="number" onChange={config.handleChange('triangle')} />
                                    </ListItemSecondaryAction>
                                </ListItem> */}
                                <ListItem>
                                    <ListItemText primary="每行单元个数" />
                                    <ListItemSecondaryAction>
                                        <Input value={config.column} type="number" onChange={config.handleChange('column')} />
                                    </ListItemSecondaryAction>
                                </ListItem>
                            </List>
                            <Button onClick={config.updateCanvas} fullWidth>更新画布</Button>
                        </div>

                    )
                }
            }

            </ConfigContext.Consumer>
        );
    }
}


export default withStyles(styles)(SwitchListSecondary);
