import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users2, UserPlus, Edit3, UserX, Database, FileEdit, CheckCircle, Shield, ListOrdered } from "lucide-react";

export default function AdminCenter() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Center</h1>
          <p className="text-muted-foreground">
            Manage users access controls and governance policies
          </p>
        </div>

        <div className="space-y-6">
          {/* User Management */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Users2 className="h-5 w-5" />
              <h2 className="text-xl font-semibold">User Management</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button variant="outline">
                <UserPlus className="h-4 w-4 mr-2" />
                Add User
              </Button>
              <Button variant="outline">
                <Edit3 className="h-4 w-4 mr-2" />
                Edit Roles
              </Button>
              <Button variant="outline">
                <UserX className="h-4 w-4 mr-2" />
                Deactivate User
              </Button>
            </div>
          </Card>

          {/* Data Source Control */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Database className="h-5 w-5" />
              <h2 className="text-xl font-semibold">Data Source Control</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button variant="outline">
                <FileEdit className="h-4 w-4 mr-2" />
                Edit Source List
              </Button>
              <Button variant="outline">
                <CheckCircle className="h-4 w-4 mr-2" />
                Approve Uploads
              </Button>
            </div>
          </Card>

          {/* Platform Governance */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="h-5 w-5" />
              <h2 className="text-xl font-semibold">Platform Governance</h2>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-success" />
                <span className="text-sm">Encryption ✅</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-success" />
                <span className="text-sm">Retention 90 days</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-success" />
                <span className="text-sm">Audit Logs Enabled</span>
              </div>
              <Button variant="outline" className="mt-4">
                <ListOrdered className="h-4 w-4 mr-2" />
                View Audit Logs
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}