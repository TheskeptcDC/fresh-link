{ pkgs, ... }:
{
  packages = [
    # Add packages here, like pkgs.nodePackages.npm or pkgs.nodePackages.pnpm
    # Since we are using npm for the dev command, let's add it here.
    pkgs.nodePackages.npm
    # If you use pnpm, you would add pkgs.nodePackages.pnpm instead.
    # pkgs.nodePackages.pnpm
  ];

  idx.previews = {
    enable = true; # Enable previews
    previews = [
      {
        # Below is an example preview configuration.
        # For more information, see:
        # https://developers.google.com/idx/guides/configure-previews
        command = [ "npm" "run" "dev" ];
        manager = "web";
        # port = 3000; # Uncomment and set the port if your app runs on a specific port
      }
    ];
  };
}