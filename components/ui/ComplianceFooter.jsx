import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Shield } from 'lucide-react';

export default function ComplianceFooter() {
  return (
    <footer className="bg-slate-100 border-t border-slate-200 py-8 mt-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-slate-900">AIRealtors247</span>
            </div>
            <p className="text-sm text-slate-600">
              AI-powered real estate success platform designed for compliance and results.
            </p>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-semibold text-slate-900 mb-3">Legal</h4>
            <div className="space-y-2 text-sm">
              <Link to={createPageUrl('TermsOfService')} className="text-slate-600 hover:text-blue-600 block">Terms of Service</Link>
              <Link to={createPageUrl('PrivacyPolicy')} className="text-slate-600 hover:text-blue-600 block">Privacy Policy</Link>
              <Link to={createPageUrl('CookiePolicy')} className="text-slate-600 hover:text-blue-600 block">Cookie Policy</Link>
              <Link to={createPageUrl('DataPolicy')} className="text-slate-600 hover:text-blue-600 block">Data Management Policy</Link>
            </div>
          </div>

          {/* Compliance */}
          <div>
            <h4 className="font-semibold text-slate-900 mb-3">Compliance</h4>
            <div className="space-y-2 text-sm">
              <Link to={createPageUrl('Compliance')} className="text-slate-600 hover:text-blue-600 block">DNC Management</Link>
              <a href="#" className="text-slate-600 hover:text-blue-600 block">TCPA Compliance</a>
              <a href="#" className="text-slate-600 hover:text-blue-600 block">GDPR Rights</a>
              <a href="#" className="text-slate-600 hover:text-blue-600 block">CASL Compliance</a>
            </div>
          </div>

          {/* Disclaimers */}
          <div>
            <h4 className="font-semibold text-slate-900 mb-3">Important Notice</h4>
            <div className="text-xs text-slate-500 space-y-2">
              <p>
                REALTOR® is a trademark of the National Association of REALTORS® and Canadian Real Estate Association.
              </p>
              <p>
                This platform is not affiliated with or endorsed by NAR, CREA, or any real estate board.
              </p>
              <p>
                AI services do not guarantee results. Success depends on your effort, skills, and market conditions.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-300 mt-8 pt-6 text-center">
          <p className="text-xs text-slate-500">
            © 2024 AIRealtors247. All rights reserved. 
            By using this platform, you agree to our Terms of Service and acknowledge our AI limitations and disclaimers.
          </p>
        </div>
      </div>
    </footer>
  );
}