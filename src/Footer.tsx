import React from 'react';

interface FooterProps {
  ok: string;
}

const Footer = (props: FooterProps) => <div className="footer">{props.ok}Created by lox</div>;

export default Footer;
