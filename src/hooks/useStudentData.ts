import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { mentorshipService, progressService, certificateService, communityService, userService } from '@/services/studentServices';

/**
 * MENTORSHIP HOOKS
 */
export function useMentorship() {
  const queryClient = useQueryClient();

  const sessionsQuery = useQuery({
    queryKey: ['mentorship', 'sessions'],
    queryStyle: { placeholderData: [] }, // Default empty array instead of loading null
    queryFn: mentorshipService.getUpcomingSessions
  });

  const instructorsQuery = useQuery({
    queryKey: ['mentorship', 'instructors'],
    queryFn: mentorshipService.getInstructors
  });

  const bookMutation = useMutation({
    mutationFn: mentorshipService.bookSession,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mentorship', 'sessions'] });
    }
  });

  return { sessionsQuery, instructorsQuery, bookMutation };
}

/**
 * PROGRESS HOOKS
 */
export function useProgress(range: 'weekly' | 'monthly' = 'weekly') {
  const statsQuery = useQuery({
    queryKey: ['student', 'progress', 'stats'],
    queryFn: progressService.getStats
  });

  const activityQuery = useQuery({
    queryKey: ['student', 'progress', 'activity', range],
    queryFn: () => progressService.getActivity(range)
  });

  const skillsQuery = useQuery({
    queryKey: ['student', 'progress', 'skills'],
    queryFn: progressService.getSkills
  });

  return { statsQuery, activityQuery, skillsQuery };
}

/**
 * CERTIFICATE HOOKS
 */
export function useCertificates() {
  const listQuery = useQuery({
    queryKey: ['student', 'certificates'],
    queryFn: certificateService.getCertificates
  });

  const downloadMutation = useMutation({
    mutationFn: certificateService.getDownloadUrl
  });

  return { listQuery, downloadMutation };
}

/**
 * COMMUNITY HOOKS
 */
export function useCommunity() {
  const queryClient = useQueryClient();

  const feedQuery = useQuery({
    queryKey: ['community', 'feed'],
    queryFn: () => communityService.getFeed()
  });

  const leaderboardQuery = useQuery({
    queryKey: ['community', 'leaderboard'],
    queryFn: communityService.getLeaderboard
  });

  const postMutation = useMutation({
    mutationFn: communityService.createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['community', 'feed'] });
    }
  });

  const likeMutation = useMutation({
    mutationFn: communityService.likePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['community', 'feed'] });
    }
  });

  return { feedQuery, leaderboardQuery, postMutation, likeMutation };
}

/**
 * USER & SETTINGS HOOKS
 */
export function useUser() {
  const queryClient = useQueryClient();

  const profileQuery = useQuery({
    queryKey: ['student', 'profile'],
    queryFn: userService.getProfile
  });

  const updateProfileMutation = useMutation({
    mutationFn: userService.updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['student', 'profile'] });
    }
  });

  const updateSettingsMutation = useMutation({
    mutationFn: userService.updateSettings
  });

  const changePasswordMutation = useMutation({
    mutationFn: userService.changePassword
  });

  return { 
    profileQuery, 
    updateProfileMutation, 
    updateSettingsMutation, 
    changePasswordMutation 
  };
}
