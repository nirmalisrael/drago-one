import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  IconButton,
  Collapse,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  School as SchoolIcon,
  Assignment as AssignmentIcon,
  Quiz as QuizIcon,
  Work as ProjectIcon,
  CalendarToday as CalendarIcon
} from '@mui/icons-material';
import { useEducationColors } from '@/hooks/useEducationColors';
import { useTheme } from '@mui/material/styles';
import { AcademicTitle, CourseCode, SemesterInfo } from './AcademicTypography';

interface AcademicEvent {
  id: string;
  type: 'semester' | 'course' | 'assignment' | 'exam' | 'project';
  title: string;
  date: string;
  description?: string;
  courseCode?: string;
  status?: 'upcoming' | 'current' | 'completed';
}

interface AcademicCalendarProps {
  semester: string;
  year: number;
  events: AcademicEvent[];
  showDetails?: boolean;
}

const AcademicCalendar: React.FC<AcademicCalendarProps> = ({
  semester,
  year,
  events
}) => {
  const { getAcademicColor } = useEducationColors();
  const theme = useTheme();
  const [expanded, setExpanded] = useState(true);

  const eventConfig = {
    semester: { icon: <SchoolIcon />, label: 'Semester' },
    course: { icon: <SchoolIcon />, label: 'Course' },
    assignment: { icon: <AssignmentIcon />, label: 'Assignment' },
    exam: { icon: <QuizIcon />, label: 'Exam' },
    project: { icon: <ProjectIcon />, label: 'Project' }
  };

  const getEventColor = (type: AcademicEvent['type']) => {
    return getAcademicColor(type);
  };

  const sortedEvents = events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const upcomingEvents = sortedEvents.filter(event =>
    new Date(event.date) >= new Date() && event.status !== 'completed'
  );

  const currentEvents = sortedEvents.filter(event => {
    const eventDate = new Date(event.date);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - eventDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7 && event.status !== 'completed';
  });

  return (
    <Card sx={{
      backgroundColor: theme.palette.background.paper,
      border: `1px solid ${theme.palette.divider}`,
      borderRadius: 2
    }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <CalendarIcon sx={{ color: theme.palette.primary.main }} />
            <AcademicTitle title="Academic Calendar" level="h5" />
          </Box>
          <IconButton
            onClick={() => setExpanded(!expanded)}
            sx={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}
          >
            <ExpandMoreIcon />
          </IconButton>
        </Box>

        <SemesterInfo semester={semester} year={year} variant="detailed" />

        <Collapse in={expanded}>
          <Box sx={{ mt: 3 }}>
            {/* Current Events */}
            {currentEvents.length > 0 && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1, color: theme.palette.warning.main }}>
                  Current Week
                </Typography>
                <List dense>
                  {currentEvents.map((event) => (
                    <ListItem key={event.id} sx={{ pl: 0 }}>
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        <Box sx={{ color: getEventColor(event.type) }}>
                          {eventConfig[event.type].icon}
                        </Box>
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                            <Typography variant="body2" fontWeight={500}>
                              {event.title}
                            </Typography>
                            {event.courseCode && (
                              <CourseCode code={event.courseCode} variant="outlined" />
                            )}
                          </Box>
                        }
                        secondary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                            <Chip
                              label={event.date}
                              size="small"
                              sx={{
                                backgroundColor: getEventColor(event.type),
                                color: 'white',
                                fontSize: '0.75rem'
                              }}
                            />
                            <Chip
                              label={eventConfig[event.type].label}
                              size="small"
                              variant="outlined"
                              sx={{
                                borderColor: getEventColor(event.type),
                                color: getEventColor(event.type),
                                fontSize: '0.75rem'
                              }}
                            />
                          </Box>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}

            {/* Upcoming Events */}
            {upcomingEvents.length > 0 && (
              <Box>
                <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1, color: theme.palette.primary.main }}>
                  Upcoming Events
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  {upcomingEvents.slice(0, 6).map((event) => (
                    <Box key={event.id} sx={{ flex: '1 1 300px', minWidth: 300, maxWidth: 400 }}>
                      <Card sx={{
                        border: `1px solid ${getEventColor(event.type)}`,
                        backgroundColor: theme.palette.background.elevated,
                        '&:hover': { transform: 'translateY(-2px)', boxShadow: 2 },
                        transition: 'all 0.2s ease-in-out'
                      }}>
                        <CardContent sx={{ p: 2 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                            <Box sx={{ color: getEventColor(event.type) }}>
                              {eventConfig[event.type].icon}
                            </Box>
                            <Typography variant="body2" fontWeight={500}>
                              {event.title}
                            </Typography>
                          </Box>

                          {event.courseCode && (
                            <Box sx={{ mb: 1 }}>
                              <CourseCode code={event.courseCode} variant="filled" />
                            </Box>
                          )}

                          <Chip
                            label={event.date}
                            size="small"
                            sx={{
                              backgroundColor: getEventColor(event.type),
                              color: 'white',
                              fontSize: '0.75rem'
                            }}
                          />

                          {event.description && (
                            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
                              {event.description}
                            </Typography>
                          )}
                        </CardContent>
                      </Card>
                    </Box>
                  ))}
                </Box>
              </Box>
            )}

            {/* Summary Stats */}
            <Box sx={{
              display: 'flex',
              gap: 2,
              mt: 3,
              pt: 2,
              borderTop: `1px solid ${theme.palette.divider}`,
              flexWrap: 'wrap'
            }}>
              <Chip
                label={`${upcomingEvents.length} Upcoming`}
                size="small"
                sx={{ backgroundColor: theme.palette.primary.main, color: 'white' }}
              />
              <Chip
                label={`${currentEvents.length} This Week`}
                size="small"
                sx={{ backgroundColor: theme.palette.warning.main, color: 'white' }}
              />
              <Chip
                label={`${events.length} Total Events`}
                size="small"
                variant="outlined"
                sx={{ borderColor: theme.palette.primary.main, color: theme.palette.primary.main }}
              />
            </Box>
          </Box>
        </Collapse>
      </CardContent>
    </Card>
  );
};

export default AcademicCalendar;
