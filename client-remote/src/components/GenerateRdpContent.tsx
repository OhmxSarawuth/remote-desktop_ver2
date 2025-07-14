import React, { useState } from 'react';

/**
 * Generates the content for the .rdp file.
 * Includes server address, username, and optionally a base64 encoded password.
 *
 * @param ip The IP address or hostname of the RDP server.
 * @param user The username for the RDP connection.
 * @param pass The password for the RDP connection (will be base64 encoded).
 * @returns A string containing the .rdp file content.
 */
export const generateRdpContent = (ip: string, user: string, pass: string): string => {
  // Base64 encode the password. Note: This is NOT encryption and is easily reversible.
  // For full Unicode support, consider using TextEncoder:
  // const encodedPassword = btoa(String.fromCharCode(...new TextEncoder().encode(pass)));
  const encodedPassword = btoa(pass);

  // RDP file content.
  // Adding 'password:b:' followed by base64 encoded password.
  return `
full address:s:${ip}
username:s:${user}
password:b:${encodedPassword}
screen mode id:i:1
desktopwidth:i:1024
desktopheight:i:768
session bpp:i:24
enablecredsspsupport:i:1
authentication level:i:3
`.trim();
};

/**
 * Custom hook to handle RDP file generation and download logic.
 * Provides state for server address, username, password, and error messages,
 * along with the function to trigger the download.
 *
 * @returns An object containing:
 * - serverAddress: State for RDP server address.
 * - setServerAddress: Setter for serverAddress.
 * - username: State for RDP username.
 * - setUsername: Setter for username.
 * - password: State for RDP password.
 * - setPassword: Setter for password.
 * - error: State for error messages.
 * - handleDownload: Function to trigger the RDP file download.
 */
export const useRdpDownloader = () => {
  const [serverAddress, setServerAddress] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  // Handles the download of the .rdp file
  const handleDownload = () => {
    setError('');
    if (!serverAddress || !username || !password) {
      setError('Please enter server address, username, and password.');
      return;
    }

    try {
      const content = generateRdpContent(serverAddress, username, password);
      const blob = new Blob([content], { type: 'application/x-rdp' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${username}_${serverAddress.replace(/[^a-zA-Z0-9.-]/g, '_')}.rdp`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Download error:', err);
      setError('Failed to download RDP file.');
    }
  };

  return {
    serverAddress,
    setServerAddress,
    username,
    setUsername,
    password,
    setPassword,
    error,
    handleDownload,
  };
};
