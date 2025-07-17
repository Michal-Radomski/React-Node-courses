type ProfileProps =
  | {
      showLinkedin: true;
      linkedinId: string;
    }
  | {
      showLinkedin?: false;
      githubId: string;
    };

const Profile = (props: ProfileProps): JSX.Element => {
  if (props.showLinkedin) {
    return <a href={`https://www.linkedin.com/in/${props.linkedinId}`}>Linkedin Profile</a>;
  }

  return <a href={`https://github.com/${props.githubId}`}>Github Profile</a>;
};

export default Profile;
