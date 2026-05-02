import { Link } from 'react-router-dom';
import { Instagram, Twitter, Youtube, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-surface-container-high border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <Link to="/" className="text-2xl font-black font-headline text-white tracking-widest">
              ALIEN
            </Link>
            <p className="text-gray-500 mt-4 text-sm">
              Redefine your limits. Elite performance training for the modern athlete.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-headline font-bold uppercase tracking-wider text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li><Link to="/plans" className="text-gray-500 hover:text-primary-fixed text-sm">Plans</Link></li>
              <li><Link to="/store" className="text-gray-500 hover:text-primary-fixed text-sm">Store</Link></li>
              <li><Link to="/#gym" className="text-gray-500 hover:text-primary-fixed text-sm">Facilities</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-headline font-bold uppercase tracking-wider text-white mb-4">
              Support
            </h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-500 hover:text-primary-fixed text-sm">FAQ</a></li>
              <li><a href="#" className="text-gray-500 hover:text-primary-fixed text-sm">Contact</a></li>
              <li><a href="#" className="text-gray-500 hover:text-primary-fixed text-sm">Privacy</a></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-sm font-headline font-bold uppercase tracking-wider text-white mb-4">
              Connect
            </h4>
            <div className="flex items-center gap-4">
              <a href="#" className="p-2 bg-surface-container-highest rounded-lg text-gray-400 hover:text-primary-fixed transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-surface-container-highest rounded-lg text-gray-400 hover:text-primary-fixed transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-surface-container-highest rounded-lg text-gray-400 hover:text-primary-fixed transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-surface-container-highest rounded-lg text-gray-400 hover:text-primary-fixed transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-white/5 text-center">
          <p className="text-gray-600 text-sm">
            © 2024 ALIEN Performance. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
