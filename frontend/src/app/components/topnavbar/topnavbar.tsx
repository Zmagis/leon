import React from 'react';
import { Avatar, Button, Layout, Menu } from 'antd';
import {
    BookOutlined,
    CalendarOutlined,
    CodeSandboxOutlined,
    FormOutlined,
    TrophyOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';

import { navigationService } from 'app/service/navigation-service';
import { connectContext, SettingsProps } from 'app/context';
import { Clock } from 'app/components/clock/clock';

// import { Lessons } from 'app/page/home/timetable/day-lessons-list/lessons';
import styles from './topnavbar.module.scss';

const { SubMenu } = Menu;
const { Header } = Layout;

interface OwnProps {
}

interface ContextProps {
    teacherLessons: Api.Lesson[];
    username: string | null;
    userRoles: string[] | null;
}

type Props = OwnProps & ContextProps;

class TopNavBarComponent extends React.Component<Props> {

    public render(): React.ReactNode {

        const {
            teacherLessons,
        } = this.props;

        const currentLesson = teacherLessons && teacherLessons.filter((lesson) => lesson.status === 1);

        let lessonId: number;

        if (currentLesson != null) {
            if (currentLesson.length > 0) {
                lessonId = currentLesson && parseInt(currentLesson[0].id.toString(), 10);
            }
        }

        return (
            <Header>

                <Menu theme="dark" mode="horizontal">
                    <Menu.Item key="home" onClick={() => this.handleClickToDefaultPage()}>
                        <CodeSandboxOutlined style={{ fontSize: '30px', color: 'blue' }} />
                    </Menu.Item>

                    <Menu.Item key="timetable"
                               onClick={this.handleClickToCalendarPage} icon={<CalendarOutlined/>}>
                        Timetable
                    </Menu.Item>
                    {/*<Menu.Item key="material"*/}
                    {/*           icon={<BookOutlined/>}>*/}
                    {/*    Pamokų medžiaga*/}
                    {/*</Menu.Item>*/}
                    {/*<Menu.Item key="achievements" icon={<TrophyOutlined/>}>*/}
                    {/*    Pasiekimai*/}
                    {/*</Menu.Item>*/}
                    <Menu.Item key="forum"
                               onClick={this.handleOpenChatRoom}
                               icon={<FormOutlined/>}>
                        Chat
                    </Menu.Item>

                    <SubMenu
                        icon={<Avatar size="large">{this.props.username}</Avatar>}
                        style={{ color: 'grey', float: 'right' }}
                    >

                        <Menu.ItemGroup>
                            <Menu.Item key="logout" style={{ margin: 'auto' }}>
                                <Button type="primary" onClick={this.handleClickLogout}>
                                    Atsijungti
                                </Button>
                            </Menu.Item>
                        </Menu.ItemGroup>

                    </SubMenu>
                    {/* <Menu.Item style={{display: 'block', float: 'right'}}>
                        <Button
                            disabled={!lessonId ? true : false}
                            type="primary"

                            icon={<VideoCameraOutlined/>}
                            onClick={() => this.handleOpenClassroom(lessonId)}
                        >
                            Current lesson
                        </Button>
                    </Menu.Item> */}
                    <Menu.Item className={styles.modifiedItem}>
                        <Clock />
                    </Menu.Item>
                </Menu>
            </Header>
        );
    }
    private readonly handleClickLogout = (): void => {
        navigationService.redirectToLogoutPage();
    };
    // private readonly navStudentHandler = (): any =>
    //     this.props.userRoles[0] === 'STUDENT' ? { display: 'none' } : null;
    private readonly handleClickToDefaultPage = (): void => {
        navigationService.redirectToDefaultPage();
    };
    private readonly handleClickToVideoPage = (): void => {
        navigationService.redirectToVideoChat();
    };
    private readonly handleClickToCalendarPage = (): void => {
        navigationService.redirectToCalendarPage();
    };

    private readonly handleOpenClassroom = (id: number): void => {
        if (id) {
            navigationService.redirectToVideoChat(id);
        }
    };

    private readonly handleOpenChatRoom = (): void => {
        navigationService.redirectToChatRoom();
    };
}

const mapContextToProps = ({ session: { user }, lessons }: SettingsProps): ContextProps => ({
    teacherLessons: lessons,
    username: user != null ? user.username : null,
    userRoles: user.roles,
});

const TopNavBar = connectContext(mapContextToProps)(TopNavBarComponent);

export { TopNavBar };
