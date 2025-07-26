"use client"

import type { FormEvent } from "react"
import { Activity, Clock, Dog, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { currentUsers } from "@/lib/data"
import { isVaccineUpToDate } from "@/lib/utils"
import { termsOfUseText, UserStatus, ImabariResidency } from "@/lib/constants"
import type { DogProfile } from "@/lib/types"

interface HomeSectionProps {
  userStatus: UserStatus
  setUserStatus: (status: UserStatus) => void
  showTerms: boolean
  setShowTerms: (show: boolean) => void
  loginError: string
  setLoginError: (error: string) => void
  vaccinationCertificateFile: File | null
  setVaccinationCertificateFile: (file: File | null) => void
  selectedImabariResidency: string
  setSelectedImabariResidency: (residency: string) => void
  handleRegistrationSubmit: (e: FormEvent) => void
  handleLoginSubmit: (e: FormEvent) => void
  handleForgotPasswordSubmit: (e: FormEvent) => void
  handleDemoLogin: () => void
}

export function HomeSection({
  userStatus,
  setUserStatus,
  showTerms,
  setShowTerms,
  loginError,
  setLoginError,
  vaccinationCertificateFile,
  setVaccinationCertificateFile,
  selectedImabariResidency,
  setSelectedImabariResidency,
  handleRegistrationSubmit,
  handleLoginSubmit,
  handleForgotPasswordSubmit,
  handleDemoLogin,
}: HomeSectionProps) {
  const today = new Date()
  const formattedDate = today.toLocaleDateString("ja-JP", {
    month: "long",
    day: "numeric",
    weekday: "short",
  }) // 例: 3月25日(火)

  return (
    <div className="space-y-6">
      {/* Today's Status Banner */}
      <Card
        className="bg-gradient-to-r from-asics-blue to-asics-blue-darker text-white border-0"
        style={{ background: "linear-gradient(135deg, rgb(0, 8, 148) 0%, rgb(0, 5, 120) 100%)" }}
      >
        <CardContent className="p-6 text-center">
          <div className="text-xl font-heading mb-1">本日開館 | 9:00〜17:00</div>
          <div className="text-sm opacity-90 font-caption">最終入館16:30</div>
        </CardContent>
      </Card>

      {/* Current Status */}
      <Card
        className="border-asics-blue-200"
        style={{ backgroundColor: "rgba(0, 8, 148, 0.05)", borderColor: "rgba(0, 8, 148, 0.2)" }}
      >
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center font-heading" style={{ color: "rgb(0, 8, 148)" }}>
            <Activity className="h-5 w-5 mr-2" />
            現在の利用状況
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="text-5xl font-heading text-right" style={{ color: "rgb(0, 8, 148)" }}>
            3匹
          </div>
          <div className="text-xs text-gray-500 font-caption">最終更新：5分前</div>
        </CardContent>
      </Card>

      {/* Current Users */}
      <div>
        <h2 className="text-lg font-heading mb-4 flex items-center" style={{ color: "rgb(0, 8, 148)" }}>
          <Users className="h-5 w-5 mr-2" />
          現在利用中のワンちゃん
        </h2>
        <div className="space-y-3">
          {currentUsers.map((user: DogProfile) => (
            <Card key={user.id} className="cursor-pointer hover:shadow-md transition-shadow border-asics-blue-100">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "rgba(255, 235, 0, 0.2)" }}
                  >
                    <Dog className="h-6 w-6" style={{ color: "rgb(0, 8, 148)" }} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant="outline"
                        className="text-sm border-asics-blue-200"
                        style={{ color: "rgb(0, 8, 148)" }}
                      >
                        {user.breed}
                      </Badge>
                      {user.lastVaccinationDate && isVaccineUpToDate(user.lastVaccinationDate) && (
                        <Badge variant="outline" className="text-sm bg-green-100 text-green-800 border-green-200">
                          ワクチン済
                        </Badge>
                      )}
                    </div>
                    {user.personality && user.personality.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {user.personality.map((trait, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-xs border-asics-blue-200 font-caption"
                            style={{ color: "rgb(0, 8, 148)" }}
                          >
                            {trait}
                          </Badge>
                        ))}
                      </div>
                    )}
                    <p className="text-xs text-gray-400 flex items-center mt-1 font-caption">
                      <Clock className="h-3 w-3 mr-1" />
                      {user.time}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Conditional Login/Registration UI */}
      {userStatus === UserStatus.Initial && (
        <Card
          className="border-asics-blue-200 mt-6"
          style={{ backgroundColor: "rgba(0, 8, 148, 0.05)", borderColor: "rgba(0, 8, 148, 0.2)" }}
        >
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-heading mb-4" style={{ color: "rgb(0, 8, 148)" }}>
              里山ドッグランのご利用には申請が必要です
            </h2>
            <p className="text-sm text-gray-600 font-caption mb-6">
              安全で快適な環境を提供するため、初回利用時には簡単な申請と審査をお願いしております。
            </p>
            <Button
              onClick={() => setUserStatus(UserStatus.RegistrationForm)}
              className="text-white"
              style={{ backgroundColor: "rgb(0, 8, 148)" }}
            >
              利用申請をする
            </Button>
          </CardContent>
        </Card>
      )}

      {userStatus === UserStatus.RegistrationForm && (
        <div className="space-y-6 mt-6">
          <h2 className="text-lg font-heading mb-4" style={{ color: "rgb(0, 8, 148)" }}>
            利用申請フォーム
          </h2>
          <Card className="border-asics-blue-100">
            <CardContent className="p-4">
              <form onSubmit={handleRegistrationSubmit} className="space-y-4">
                {/* 1. 利用規約・確認事項に同意 */}
                <div className="flex items-center">
                  <input
                    id="agree"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    required
                  />
                  <label htmlFor="agree" className="ml-2 block text-sm text-gray-900 font-caption">
                    利用規約・確認事項を読み、
                    <Dialog open={showTerms} onOpenChange={setShowTerms}>
                      <DialogTrigger asChild>
                        <Button variant="link" className="p-0 h-auto text-blue-600 text-sm font-caption">
                          こちら
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="font-heading">利用規約</DialogTitle>
                          {/* 既存の閉じるボタンはshadcn/uiのDialogContentによって提供されるため、手動で追加したものを削除 */}
                          {/* <Button
                            variant="ghost"
                            size="icon"
                            className="absolute right-4 top-4"
                            onClick={() => setShowTerms(false)}
                          >
                            <X className="h-4 w-4" />
                            <span className="sr-only">Close</span>
                          </Button> */}
                        </DialogHeader>
                        <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-wrap font-caption">
                          {termsOfUseText}
                        </div>
                      </DialogContent>
                    </Dialog>
                    に同意します
                  </label>
                </div>
                {/* 2. 申込年月日 */}
                <div>
                  <Label htmlFor="applicationDate" className="block text-sm font-caption font-medium text-gray-700">
                    申込年月日
                  </Label>
                  <Input
                    type="date"
                    id="applicationDate"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                {/* 3. 住所 */}
                <div>
                  <Label htmlFor="address" className="block text-sm font-caption font-medium text-gray-700">
                    住所
                  </Label>
                  <Input
                    type="text"
                    id="address"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="東京都渋谷区..."
                    required
                  />
                </div>
                {/* 4. 名前(フルネーム) */}
                <div>
                  <Label htmlFor="fullName" className="block text-sm font-caption font-medium text-gray-700">
                    お名前 (フルネーム)
                  </Label>
                  <Input
                    type="text"
                    id="fullName"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="田中 太郎"
                    required
                  />
                </div>
                {/* 5. Emailアドレス(連絡先) */}
                <div>
                  <Label htmlFor="email" className="block text-sm font-caption font-medium text-gray-700">
                    Emailアドレス (連絡先)
                  </Label>
                  <Input
                    type="email"
                    id="email"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="your@example.com"
                    required
                  />
                </div>
                {/* 6. 携帯電話番号(緊急時連絡先) */}
                <div>
                  <Label htmlFor="phoneNumber" className="block text-sm font-caption font-medium text-gray-700">
                    携帯電話番号 (緊急時連絡先)
                  </Label>
                  <Input
                    type="tel"
                    id="phoneNumber"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="090-1234-5678"
                    required
                  />
                </div>
                {/* 今治市内の居住歴 */}
                <div>
                  <Label htmlFor="imabariResidency" className="block text-sm font-caption font-medium text-gray-700">
                    今治市内の居住歴
                  </Label>
                  <Select onValueChange={setSelectedImabariResidency} value={selectedImabariResidency} required>
                    <SelectTrigger
                      id="imabariResidency"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 [&>svg]:!hidden justify-start"
                    >
                      <SelectValue placeholder="選択してください" className="text-left" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={ImabariResidency.LessThan1Year}>1年未満</SelectItem>
                      <SelectItem value={ImabariResidency.OneToThreeYears}>1年以上3年未満</SelectItem>
                      <SelectItem value={ImabariResidency.ThreeToFiveYears}>3年以上5年未満</SelectItem>
                      <SelectItem value={ImabariResidency.MoreThan5Years}>5年以上</SelectItem>
                      <SelectItem value={ImabariResidency.NotInImabari}>今治市内には住んでいない</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {/* 7. ワンちゃんのお名前 */}
                <div>
                  <Label htmlFor="dogName" className="block text-sm font-caption font-medium text-gray-700">
                    ワンちゃんのお名前
                  </Label>
                  <Input
                    type="text"
                    id="dogName"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="ポチ"
                    required
                  />
                </div>
                {/* 8. 犬種 */}
                <div>
                  <Label htmlFor="dogBreed" className="block text-sm font-caption font-medium text-gray-700">
                    犬種
                  </Label>
                  <Input
                    type="text"
                    id="dogBreed"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="柴犬"
                    required
                  />
                </div>
                {/* 9. ワンちゃんの体重 */}
                <div>
                  <Label htmlFor="dogWeight" className="block text-sm font-caption font-medium text-gray-700">
                    ワンちゃんの体重 (kg)
                  </Label>
                  <Input
                    type="number"
                    id="dogWeight"
                    step="0.1"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="8.5"
                    required
                  />
                </div>
                {/* ワクチン接種証明書 */}
                <div>
                  <Label
                    htmlFor="vaccinationCertificate"
                    className="block text-sm font-caption font-medium text-gray-700"
                  >
                    ワクチン接種証明書 (ファイル添付) <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="file"
                    id="vaccinationCertificate"
                    accept=".pdf,.jpg,.jpeg,.png" // Accept common image and PDF formats
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    onChange={(e) => setVaccinationCertificateFile(e.target.files ? e.target.files[0] : null)}
                    required
                  />
                  {vaccinationCertificateFile && (
                    <p className="text-xs text-gray-500 mt-1">選択中のファイル: {vaccinationCertificateFile.name}</p>
                  )}
                </div>
                {/* パスワード設定 */}
                <div>
                  <Label htmlFor="password" className="block text-sm font-caption font-medium text-gray-700">
                    パスワード
                  </Label>
                  <Input
                    type="password"
                    id="password"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="confirmPassword" className="block text-sm font-caption font-medium text-gray-700">
                    パスワード (確認用)
                  </Label>
                  <Input
                    type="password"
                    id="confirmPassword"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <Button type="submit" className="w-full text-white" style={{ backgroundColor: "rgb(0, 8, 148)" }}>
                  申請を送信する
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      {userStatus === UserStatus.RegistrationPending && (
        <Card
          className="border-asics-blue-200 mt-6"
          style={{ backgroundColor: "rgba(0, 8, 148, 0.05)", borderColor: "rgba(0, 8, 148, 0.2)" }}
        >
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-heading mb-4" style={{ color: "rgb(0, 8, 148)" }}>
              申請審査中
            </h2>
            <p className="text-sm text-gray-600 font-caption mb-6">
              現在、利用申請を審査中です。承認までしばらくお待ちください。
              <br />
              通常、2〜3営業日以内に結果をお知らせします。
            </p>
            <Button
              onClick={() => setUserStatus(UserStatus.ApprovedNeedsLogin)} // シミュレーション用ボタン
              className="text-white"
              style={{ backgroundColor: "rgb(0, 8, 148)" }}
            >
              審査を承認する (デモ用)
            </Button>
          </CardContent>
        </Card>
      )}

      {userStatus === UserStatus.ApprovedNeedsLogin && (
        <Card
          className="border-asics-blue-200 mt-6"
          style={{ backgroundColor: "rgba(0, 8, 148, 0.05)", borderColor: "rgba(0, 8, 148, 0.2)" }}
        >
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-heading mb-4" style={{ color: "rgb(0, 8, 148)" }}>
              ログインしてください
            </h2>
            <p className="text-sm text-gray-600 font-caption mb-6">
              利用申請が承認されました。登録したメールアドレスとパスワードでログインしてください。
            </p>
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <Label htmlFor="loginEmail" className="block text-sm font-caption font-medium text-gray-700 text-left">
                  Emailアドレス
                </Label>
                <Input
                  type="email"
                  id="loginEmail"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="your@example.com"
                  required
                />
              </div>
              <div>
                <Label
                  htmlFor="loginPassword"
                  className="block text-sm font-caption font-medium text-gray-700 text-left"
                >
                  パスワード
                </Label>
                <Input
                  type="password"
                  id="loginPassword"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              {loginError && <p className="text-red-500 text-sm font-caption">{loginError}</p>}
              <Button type="submit" className="w-full text-white" style={{ backgroundColor: "rgb(0, 8, 148)" }}>
                ログイン
              </Button>
              <Button
                variant="link"
                onClick={() => setUserStatus(UserStatus.ForgotPasswordForm)}
                className="w-full text-sm p-0 h-auto font-caption"
                style={{ color: "rgb(0, 8, 148)" }}
              >
                パスワードをお忘れですか？
              </Button>
              <Button
                onClick={handleDemoLogin}
                className="w-full text-white"
                style={{ backgroundColor: "rgb(255, 235, 0)", color: "rgb(0, 8, 148)" }}
              >
                デモ用ログイン (無条件)
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {userStatus === UserStatus.ForgotPasswordForm && (
        <Card
          className="border-asics-blue-200 mt-6"
          style={{ backgroundColor: "rgba(0, 8, 148, 0.05)", borderColor: "rgba(0, 8, 148, 0.2)" }}
        >
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-heading mb-4" style={{ color: "rgb(0, 8, 148)" }}>
              パスワードをリセット
            </h2>
            <p className="text-sm text-gray-600 font-caption mb-6">
              ご登録のメールアドレスを入力してください。パスワード再設定用のリンクをお送りします。
            </p>
            <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
              <div>
                <Label htmlFor="resetEmail" className="block text-sm font-caption font-medium text-gray-700 text-left">
                  Emailアドレス
                </Label>
                <Input
                  type="email"
                  id="resetEmail"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <Button type="submit" className="w-full text-white" style={{ backgroundColor: "rgb(0, 8, 148)" }}>
                送信
              </Button>
              <Button
                variant="link"
                onClick={() => setUserStatus(UserStatus.ApprovedNeedsLogin)}
                className="w-full text-sm p-0 h-auto font-caption"
                style={{ color: "rgb(0, 8, 148)" }}
              >
                ログイン画面に戻る
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {userStatus === UserStatus.ForgotPasswordSent && (
        <Card
          className="border-asics-blue-200 mt-6"
          style={{ backgroundColor: "rgba(0, 8, 148, 0.05)", borderColor: "rgba(0, 8, 148, 0.2)" }}
        >
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-heading mb-4" style={{ color: "rgb(0, 8, 148)" }}>
              メールを送信しました
            </h2>
            <p className="text-sm text-gray-600 font-caption mb-6">
              パスワード再設定用のリンクをメールアドレスに送信しました。
              <br />
              メールをご確認ください。
            </p>
            <Button
              onClick={() => setUserStatus(UserStatus.ApprovedNeedsLogin)}
              className="w-full text-white"
              style={{ backgroundColor: "rgb(0, 8, 148)" }}
            >
              ログイン画面に戻る
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
